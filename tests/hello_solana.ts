import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HelloSolana } from "../target/types/hello_solana";
import { assert } from "chai";
import BN from "bn.js";

// describe("hello_solana", () => {
//   // Configure the client to use the local cluster.
//   const provider = anchor.AnchorProvider.env();
//   anchor.setProvider(provider);

//   const program = anchor.workspace.HelloSolana as Program<HelloSolana>;

//   let Account1 = anchor.web3.Keypair.generate();

//   it("Is initialized!", async () => {
//     await program.methods
//       .initialize("Hello Solana!")
//       .accounts({
//         Account1: Account1.publicKey,
//         user: provider.wallet.publicKey,
//       })
//       .signers([Account1])
//       .rpc();

//     const account = await program.account.greetingAccount.fetch(
//       Account1.publicKey
//     );
//     console.log("Stored greeting:", account.greeting);
//     assert.equal(account.greeting, "Hello Solana!");
//   });

//   it("Can update the message", async () => {
//     await program.methods
//       .update("Updated greeting")
//       .accounts({
//         Account1: Account1.publicKey,
//       })
//       .rpc();

//     const account = await program.account.greetingAccount.fetch(
//       Account1.publicKey
//     );
//     console.log("Updated greeting:", account.greeting);
//     assert.equal(account.greeting, "Updated greeting");
//   });
// });

describe("hello_solana", () => {
	const provider = anchor.AnchorProvider.env();
	anchor.setProvider(provider);

	const program = anchor.workspace.HelloSolana as Program<HelloSolana>;

	let Account1: anchor.web3.Keypair;
	let Account2: anchor.web3.Keypair;


	before(async () => {
		// Generate Keys
		Account1 = anchor.web3.Keypair.generate();
		Account2 = anchor.web3.Keypair.generate();

		// Account 1 setup
		await program.methods
		.initialize()
		.accounts({
			baseAccount: Account1.publicKey,
			user: provider.wallet.publicKey,
		})
		.signers([Account1])
		.rpc();

		// Account 2 setup
		await program.methods
		.initialize()
		.accounts({
			baseAccount: Account2.publicKey,
			user: provider.wallet.publicKey,
		})
		.signers([Account2])
		.rpc();
	})

	it ("<Test Init>", async () => {
		let testAccount = anchor.web3.Keypair.generate();
		await program.methods
		.initialize()
		.accounts({
			baseAccount: testAccount.publicKey,
			user: provider.wallet.publicKey,
		})
		.signers([testAccount])
		.rpc();

		const account = await program.account.greetingUser.fetch(testAccount.publicKey);
		console.log("Owner:", account.owner, "amount:", account.amount, "self greets:", account.selfGreets);
		assert(account.owner.equals(provider.wallet.publicKey))
		assert(account.amount.eq(new BN(0)));
		assert(account.selfGreets.eq(new BN(0)));
	});

	it ("<Test Self Greet>", async () => {
		await program.methods.greet()
		.accounts({
			baseAccount: Account1.publicKey,
			user: provider.wallet.publicKey,
		}).rpc();

		const account = await program.account.greetingUser.fetch(Account1.publicKey);
		console.log("Owner:", account.owner, "amount:", account.amount, "self greets:", account.selfGreets);
		assert(account.owner.equals(provider.wallet.publicKey))
		assert(account.amount.eq(new BN(0)));
		assert(account.selfGreets.eq(new BN(1)));
	});
});
