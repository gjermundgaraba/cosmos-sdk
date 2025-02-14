package cli_test

import (
	"context"
	"fmt"
	"io"
	"testing"

	sdkmath "cosmossdk.io/math"
	rpcclientmock "github.com/cometbft/cometbft/rpc/client/mock"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	"github.com/stretchr/testify/require"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	svrcmd "github.com/cosmos/cosmos-sdk/server/cmd"
	"github.com/cosmos/cosmos-sdk/testutil"
	sdk "github.com/cosmos/cosmos-sdk/types"
	testutilmod "github.com/cosmos/cosmos-sdk/types/module/testutil"
	"github.com/cosmos/cosmos-sdk/x/crisis"
	"github.com/cosmos/cosmos-sdk/x/crisis/client/cli"
)

func TestNewMsgVerifyInvariantTxCmd(t *testing.T) {
	encCfg := testutilmod.MakeTestEncodingConfig(crisis.AppModuleBasic{})
	kr := keyring.NewInMemory(encCfg.Codec)
	baseCtx := client.Context{}.
		WithKeyring(kr).
		WithTxConfig(encCfg.TxConfig).
		WithCodec(encCfg.Codec).
		WithClient(clitestutil.MockCometRPC{Client: rpcclientmock.Client{}}).
		WithAccountRetriever(client.MockAccountRetriever{}).
		WithOutput(io.Discard).
		WithChainID("test-chain")

	accounts := testutil.CreateKeyringAccounts(t, kr, 1)
	testCases := []struct {
		name         string
		args         []string
		expectErrMsg string
	}{
		{
			"missing module",
			[]string{
				"", "total-supply",
				fmt.Sprintf("--%s=%s", flags.FlagFrom, accounts[0].Address.String()),
				fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
				fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastSync),
				fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(sdk.DefaultBondDenom, sdkmath.NewInt(10))).String()),
			},
			"invalid module name",
		},
		{
			"missing invariant route",
			[]string{
				"bank", "",
				fmt.Sprintf("--%s=%s", flags.FlagFrom, accounts[0].Address.String()),
				fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
				fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastSync),
				fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(sdk.DefaultBondDenom, sdkmath.NewInt(10))).String()),
			},
			"invalid invariant route",
		},
		{
			"valid transaction",
			[]string{
				"bank", "total-supply",
				fmt.Sprintf("--%s=%s", flags.FlagFrom, accounts[0].Address.String()),
				fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
				fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastSync),
				fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(sdk.DefaultBondDenom, sdkmath.NewInt(10))).String()),
			},
			"",
		},
	}

	for _, tc := range testCases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			ctx := svrcmd.CreateExecuteContext(context.Background())
			cmd := cli.NewMsgVerifyInvariantTxCmd()
			cmd.SetContext(ctx)
			cmd.SetArgs(tc.args)
			require.NoError(t, client.SetCmdClientContextHandler(baseCtx, cmd))

			out, err := clitestutil.ExecTestCLICmd(baseCtx, cmd, tc.args)
			if tc.expectErrMsg != "" {
				require.Error(t, err)
				require.Contains(t, out.String(), tc.expectErrMsg)
			} else {
				require.NoError(t, err)
				msg := &sdk.TxResponse{}
				require.NoError(t, baseCtx.Codec.UnmarshalJSON(out.Bytes(), msg), out.String())
			}
		})
	}
}
