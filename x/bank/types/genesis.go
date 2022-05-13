package types

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// Validate performs basic validation of supply genesis data returning an
// error for any failed validation criteria.
func (gs GenesisState) Validate() error {
	if len(gs.Params.SendEnabled) > 0 && len(gs.SendEnabled) > 0 {
		return errors.New("send_enabled defined in both the send_enabled field and in params (deprecated)")
	}
	gs.MigrateSendEnabled()

	if err := gs.Params.Validate(); err != nil {
		return err
	}

	seenSendEnabled := make(map[string]bool)
	seenBalances := make(map[string]bool)
	seenMetadatas := make(map[string]bool)

	totalSupply := sdk.Coins{}

	for _, p := range gs.SendEnabled {
		if _, exists := seenSendEnabled[p.Denom]; exists {
			return fmt.Errorf("duplicate send enabled found: '%s'", p.Denom)
		}
		if err := p.Validate(); err != nil {
			return err
		}
		seenSendEnabled[p.Denom] = true
	}

	for _, balance := range gs.Balances {
		if seenBalances[balance.Address] {
			return fmt.Errorf("duplicate balance for address %s", balance.Address)
		}

		if err := balance.Validate(); err != nil {
			return err
		}

		seenBalances[balance.Address] = true

		totalSupply = totalSupply.Add(balance.Coins...)
	}

	for _, metadata := range gs.DenomMetadata {
		if seenMetadatas[metadata.Base] {
			return fmt.Errorf("duplicate client metadata for denom %s", metadata.Base)
		}

		if err := metadata.Validate(); err != nil {
			return err
		}

		seenMetadatas[metadata.Base] = true
	}

	if !gs.Supply.Empty() {
		// NOTE: this errors if supply for any given coin is zero
		err := gs.Supply.Validate()
		if err != nil {
			return err
		}

		if !gs.Supply.IsEqual(totalSupply) {
			return fmt.Errorf("genesis supply is incorrect, expected %v, got %v", gs.Supply, totalSupply)
		}
	}

	return nil
}

// NewGenesisState creates a new genesis state.
func NewGenesisState(params Params, balances []Balance, supply sdk.Coins, denomMetaData []Metadata, sendEnabled []SendEnabled) *GenesisState {
	rv := &GenesisState{
		Params:        params,
		Balances:      balances,
		Supply:        supply,
		DenomMetadata: denomMetaData,
		SendEnabled:   sendEnabled,
	}
	rv.MigrateSendEnabled()
	return rv
}

// DefaultGenesisState returns a default bank module genesis state.
func DefaultGenesisState() *GenesisState {
	return NewGenesisState(DefaultParams(), []Balance{}, sdk.Coins{}, []Metadata{}, []SendEnabled{})
}

// GetGenesisStateFromAppState returns x/bank GenesisState given raw application
// genesis state.
func GetGenesisStateFromAppState(cdc codec.JSONCodec, appState map[string]json.RawMessage) *GenesisState {
	var genesisState GenesisState

	if appState[ModuleName] != nil {
		cdc.MustUnmarshalJSON(appState[ModuleName], &genesisState)
	}

	return &genesisState
}

// MigrateSendEnabled moves the SendEnabled info from Params into the main genesis SendEnabled field and removes them from Params.
// If the main genesis SendEnabled already has one or more entries, this is a noop.
func (g *GenesisState) MigrateSendEnabled() {
	if len(g.SendEnabled) == 0 {
		ses := g.Params.SendEnabled
		g.SendEnabled = make([]SendEnabled, len(ses))
		for i, se := range ses {
			g.SendEnabled[i] = *se
		}
		g.Params.SendEnabled = []*SendEnabled{}
	}
}
