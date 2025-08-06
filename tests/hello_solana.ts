import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HelloSolana } from "../target/types/hello_solana";
import { assert } from "chai";

describe("hello_solana", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.HelloSolana as Program<HelloSolana>;

  let baseAccount = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    await program.methods
      .initialize("Hello Solana!")
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      })
      .signers([baseAccount])
      .rpc();

    const account = await program.account.greetingAccount.fetch(
      baseAccount.publicKey
    );
    console.log("Stored greeting:", account.greeting);
    assert.equal(account.greeting, "Hello Solana!");
  });

  it("Can update the message", async () => {
    await program.methods
      .update("Updated greeting")
      .accounts({
        baseAccount: baseAccount.publicKey,
      })
      .rpc();

    const account = await program.account.greetingAccount.fetch(
      baseAccount.publicKey
    );
    console.log("Updated greeting:", account.greeting);
    assert.equal(account.greeting, "Updated greeting");
  });
});
