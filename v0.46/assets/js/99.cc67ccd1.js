(window.webpackJsonp=window.webpackJsonp||[]).push([[99],{621:function(e,t,a){"use strict";a.r(t);var i=a(1),s=Object(i.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"adr-039-epoched-staking"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adr-039-epoched-staking"}},[e._v("#")]),e._v(" ADR 039: Epoched Staking")]),e._v(" "),a("h2",{attrs:{id:"changelog"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),a("ul",[a("li",[e._v("10-Feb-2021: Initial Draft")])]),e._v(" "),a("h2",{attrs:{id:"authors"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#authors"}},[e._v("#")]),e._v(" Authors")]),e._v(" "),a("ul",[a("li",[e._v("Dev Ojha (@valardragon)")]),e._v(" "),a("li",[e._v("Sunny Aggarwal (@sunnya97)")])]),e._v(" "),a("h2",{attrs:{id:"status"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#status"}},[e._v("#")]),e._v(" Status")]),e._v(" "),a("p",[e._v("Proposed")]),e._v(" "),a("h2",{attrs:{id:"abstract"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#abstract"}},[e._v("#")]),e._v(" Abstract")]),e._v(" "),a("p",[e._v("This ADR updates the proof of stake module to buffer the staking weight updates for a number of blocks before updating the consensus' staking weights. The length of the buffer is dubbed an epoch. The prior functionality of the staking module is then a special case of the abstracted module, with the epoch being set to 1 block.")]),e._v(" "),a("h2",{attrs:{id:"context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),a("p",[e._v("The current proof of stake module takes the design decision to apply staking weight changes to the consensus engine immediately. This means that delegations and unbonds get applied immediately to the validator set. This decision was primarily done as it was implementationally simplest, and because we at the time believed that this would lead to better UX for clients.")]),e._v(" "),a("p",[e._v("An alternative design choice is to allow buffering staking updates (delegations, unbonds, validators joining) for a number of blocks. This 'epoch'd proof of stake consensus provides the guarantee that the consensus weights for validators will not change mid-epoch, except in the event of a slash condition.")]),e._v(" "),a("p",[e._v("Additionally, the UX hurdle may not be as significant as was previously thought. This is because it is possible to provide users immediate acknowledgement that their bond was recorded and will be executed.")]),e._v(" "),a("p",[e._v("Furthermore, it has become clearer over time that immediate execution of staking events comes with limitations, such as:")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("Threshold based cryptography. One of the main limitations is that because the validator set can change so regularly, it makes the running of multiparty computation by a fixed validator set difficult. Many threshold-based cryptographic features for blockchains such as randomness beacons and threshold decryption require a computationally-expensive DKG process (will take much longer than 1 block to create). To productively use these, we need to guarantee that the result of the DKG will be used for a reasonably long time. It wouldn't be feasible to rerun the DKG every block. By epoching staking, it guarantees we'll only need to run a new DKG once every epoch.")])]),e._v(" "),a("li",[a("p",[e._v("Light client efficiency. This would lessen the overhead for IBC when there is high churn in the validator set. In the Tendermint light client bisection algorithm, the number of headers you need to verify is related to bounding the difference in validator sets between a trusted header and the latest header. If the difference is too great, you verify more header in between the two. By limiting the frequency of validator set changes, we can reduce the worst case size of IBC lite client proofs, which occurs when a validator set has high churn.")])]),e._v(" "),a("li",[a("p",[e._v("Fairness of deterministic leader election. Currently we have no ways of reasoning of fairness of deterministic leader election in the presence of staking changes without epochs (tendermint/spec#217). Breaking fairness of leader election is profitable for validators, as they earn additional rewards from being the proposer. Adding epochs at least makes it easier for our deterministic leader election to match something we can prove secure. (Albeit, we still haven’t proven if our current algorithm is fair with > 2 validators in the presence of stake changes)")])]),e._v(" "),a("li",[a("p",[e._v("Staking derivative design. Currently, reward distribution is done lazily using the F1 fee distribution. While saving computational complexity, lazy accounting requires a more stateful staking implementation. Right now, each delegation entry has to track the time of last withdrawal. Handling this can be a challenge for some staking derivatives designs that seek to provide fungibility for all tokens staked to a single validator. Force-withdrawing rewards to users can help solve this, however it is infeasible to force-withdraw rewards to users on a per block basis. With epochs, a chain could more easily alter the design to have rewards be forcefully withdrawn (iterating over delegator accounts only once per-epoch), and can thus remove delegation timing from state. This may be useful for certain staking derivative designs.")])])]),e._v(" "),a("h2",{attrs:{id:"design-considerations"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#design-considerations"}},[e._v("#")]),e._v(" Design considerations")]),e._v(" "),a("h3",{attrs:{id:"slashing"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#slashing"}},[e._v("#")]),e._v(" Slashing")]),e._v(" "),a("p",[e._v("There is a design consideration for whether to apply a slash immediately or at the end of an epoch. A slash event should apply to only members who are actually staked during the time of the infraction, namely during the epoch the slash event occured.")]),e._v(" "),a("p",[e._v("Applying it immediately can be viewed as offering greater consensus layer security, at potential costs to the aforementioned usecases. The benefits of immediate slashing for consensus layer security can be all be obtained by executing the validator jailing immediately (thus removing it from the validator set), and delaying the actual slash change to the validator's weight until the epoch boundary. For the use cases mentioned above, workarounds can be integrated to avoid problems, as follows:")]),e._v(" "),a("ul",[a("li",[e._v("For threshold based cryptography, this setting will have the threshold cryptography use the original epoch weights, while consensus has an update that lets it more rapidly benefit from additional security. If the threshold based cryptography blocks liveness of the chain, then we have effectively raised the liveness threshold of the remaining validators for the rest of the epoch. (Alternatively, jailed nodes could still contribute shares) This plan will fail in the extreme case that more than 1/3rd of the validators have been jailed within a single epoch. For such an extreme scenario, the chain already have its own custom incident response plan, and defining how to handle the threshold cryptography should be a part of that.")]),e._v(" "),a("li",[e._v("For light client efficiency, there can be a bit included in the header indicating an intra-epoch slash (ala https://github.com/tendermint/spec/issues/199).")]),e._v(" "),a("li",[e._v("For fairness of deterministic leader election, applying a slash or jailing within an epoch would break the guarantee we were seeking to provide. This then re-introduces a new (but significantly simpler) problem for trying to provide fairness guarantees. Namely, that validators can adversarially elect to remove themself from the set of proposers. From a security perspective, this could potentially be handled by two different mechanisms (or prove to still be too difficult to achieve). One is making a security statement acknowledging the ability for an adversary to force an ahead-of-time fixed threshold of users to drop out of the proposer set within an epoch. The second method would be to  parameterize such that the cost of a slash within the epoch far outweights benefits due to being a proposer. However, this latter criterion is quite dubious, since being a proposer can have many advantageous side-effects in chains with complex state machines. (Namely, DeFi games such as Fomo3D)")]),e._v(" "),a("li",[e._v("For staking derivative design, there is no issue introduced. This does not increase the state size of staking records, since whether a slash has occured is fully queryable given the validator address.")])]),e._v(" "),a("h3",{attrs:{id:"token-lockup"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#token-lockup"}},[e._v("#")]),e._v(" Token lockup")]),e._v(" "),a("p",[e._v("When someone makes a transaction to delegate, even though they are not immediately staked, their tokens should be moved into a pool managed by the staking module which will then be used at the end of an epoch. This prevents concerns where they stake, and then spend those tokens not realizing they were already allocated for staking, and thus having their staking tx fail.")]),e._v(" "),a("h3",{attrs:{id:"pipelining-the-epochs"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pipelining-the-epochs"}},[e._v("#")]),e._v(" Pipelining the epochs")]),e._v(" "),a("p",[e._v("For threshold based cryptography in particular, we need a pipeline for epoch changes. This is because when we are in epoch N, we want the epoch N+1 weights to be fixed so that the validator set can do the DKG accordingly. So if we are currently in epoch N, the stake weights for epoch N+1 should already be fixed, and new stake changes should be getting applied to epoch N + 2.")]),e._v(" "),a("p",[e._v("This can be handled by making a parameter for the epoch pipeline length. This parameter should not be alterable except during hard forks, to mitigate implementation complexity of switching the pipeline length.")]),e._v(" "),a("p",[e._v("With pipeline length 1, if I redelegate during epoch N, then my redelegation is applied prior to the beginning of epoch N+1.\nWith pipeline length 2, if I redelegate during epoch N, then my redelegation is applied prior to the beginning of epoch N+2.")]),e._v(" "),a("h3",{attrs:{id:"rewards"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rewards"}},[e._v("#")]),e._v(" Rewards")]),e._v(" "),a("p",[e._v("Even though all staking updates are applied at epoch boundaries, rewards can still be distributed immediately when they are claimed. This is because they do not affect the current stake weights, as we do not implement auto-bonding of rewards. If such a feature were to be implemented, it would have to be setup so that rewards are auto-bonded at the epoch boundary.")]),e._v(" "),a("h3",{attrs:{id:"parameterizing-the-epoch-length"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#parameterizing-the-epoch-length"}},[e._v("#")]),e._v(" Parameterizing the epoch length")]),e._v(" "),a("p",[e._v("When choosing the epoch length, there is a trade-off queued state/computation buildup, and countering the previously discussed limitations of immediate execution if they apply to a given chain.")]),e._v(" "),a("p",[e._v("Until an ABCI mechanism for variable block times is introduced, it is ill-advised to be using high epoch lengths due to the computation buildup. This is because when a block's execution time is greater than the expected block time from Tendermint, rounds may increment.")]),e._v(" "),a("h2",{attrs:{id:"decision"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#decision"}},[e._v("#")]),e._v(" Decision")]),e._v(" "),a("p",[a("strong",[e._v("Step-1")]),e._v(":  Implement buffering of all staking and slashing messages.")]),e._v(" "),a("p",[e._v("First we create a pool for storing tokens that are being bonded, but should be applied at the epoch boundary called the "),a("code",[e._v("EpochDelegationPool")]),e._v(". Then, we have two separate queues, one for staking, one for slashing. We describe what happens on each message being delivered below:")]),e._v(" "),a("h3",{attrs:{id:"staking-messages"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#staking-messages"}},[e._v("#")]),e._v(" Staking messages")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("MsgCreateValidator")]),e._v(": Move user's self-bond to "),a("code",[e._v("EpochDelegationPool")]),e._v(" immediately. Queue a message for the epoch boundary to handle the self-bond, taking the funds from the "),a("code",[e._v("EpochDelegationPool")]),e._v(". If Epoch execution fail, return back funds from "),a("code",[e._v("EpochDelegationPool")]),e._v(" to user's account.")]),e._v(" "),a("li",[a("strong",[e._v("MsgEditValidator")]),e._v(": Validate message and if valid queue the message for execution at the end of the Epoch.")]),e._v(" "),a("li",[a("strong",[e._v("MsgDelegate")]),e._v(": Move user's funds to "),a("code",[e._v("EpochDelegationPool")]),e._v(" immediately. Queue a message for the epoch boundary to handle the delegation, taking the funds from the "),a("code",[e._v("EpochDelegationPool")]),e._v(". If Epoch execution fail, return back funds from "),a("code",[e._v("EpochDelegationPool")]),e._v(" to user's account.")]),e._v(" "),a("li",[a("strong",[e._v("MsgBeginRedelegate")]),e._v(": Validate message and if valid queue the message for execution at the end of the Epoch.")]),e._v(" "),a("li",[a("strong",[e._v("MsgUndelegate")]),e._v(": Validate message and if valid queue the message for execution at the end of the Epoch.")])]),e._v(" "),a("h3",{attrs:{id:"slashing-messages"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#slashing-messages"}},[e._v("#")]),e._v(" Slashing messages")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("MsgUnjail")]),e._v(": Validate message and if valid queue the message for execution at the end of the Epoch.")]),e._v(" "),a("li",[a("strong",[e._v("Slash Event")]),e._v(": Whenever a slash event is created, it gets queued in the slashing module to apply at the end of the epoch. The queues should be setup such that this slash applies immediately.")])]),e._v(" "),a("h3",{attrs:{id:"evidence-messages"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#evidence-messages"}},[e._v("#")]),e._v(" Evidence Messages")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("MsgSubmitEvidence")]),e._v(": This gets executed immediately, and the validator gets jailed immediately. However in slashing, the actual slash event gets queued.")])]),e._v(" "),a("p",[e._v("Then we add methods to the end blockers, to ensure that at the epoch boundary the queues are cleared and delegation updates are applied.")]),e._v(" "),a("p",[a("strong",[e._v("Step-2")]),e._v(": Implement querying of queued staking txs.")]),e._v(" "),a("p",[e._v("When querying the staking activity of a given address, the status should return not only the amount of tokens staked, but also if there are any queued stake events for that address. This will require more work to be done in the querying logic, to trace the queued upcoming staking events.")]),e._v(" "),a("p",[e._v("As an initial implementation, this can be implemented as a linear search over all queued staking events. However, for chains that need long epochs, they should eventually build additional support for nodes that support querying to be able to produce results in constant time. (This is do-able by maintaining an auxilliary hashmap for indexing upcoming staking events by address)")]),e._v(" "),a("p",[a("strong",[e._v("Step-3")]),e._v(": Adjust gas")]),e._v(" "),a("p",[e._v("Currently gas represents the cost of executing a transaction when its done immediately. (Merging together costs of p2p overhead, state access overhead, and computational overhead) However, now a transaction can cause computation in a future block, namely at the epoch boundary.")]),e._v(" "),a("p",[e._v("To handle this, we should initially include parameters for estimating the amount of future computation (denominated in gas), and add that as a flat charge needed for the message.\nWe leave it as out of scope for how to weight future computation versus current computation in gas pricing, and have it set such that the are weighted equally for now.")]),e._v(" "),a("h2",{attrs:{id:"consequences"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#consequences"}},[e._v("#")]),e._v(" Consequences")]),e._v(" "),a("h3",{attrs:{id:"positive"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#positive"}},[e._v("#")]),e._v(" Positive")]),e._v(" "),a("ul",[a("li",[e._v("Abstracts the proof of stake module that allows retaining the existing functionality")]),e._v(" "),a("li",[e._v("Enables new features such as validator-set based threshold cryptography")])]),e._v(" "),a("h3",{attrs:{id:"negative"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#negative"}},[e._v("#")]),e._v(" Negative")]),e._v(" "),a("ul",[a("li",[e._v("Increases complexity of integrating more complex gas pricing mechanisms, as they now have to consider future execution costs as well.")]),e._v(" "),a("li",[e._v("When epoch > 1, validators can no longer leave the network immediately, and must wait until an epoch boundary.")])])])}),[],!1,null,null,null);t.default=s.exports}}]);