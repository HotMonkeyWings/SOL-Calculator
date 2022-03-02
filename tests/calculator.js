const anchor = require('@project-serum/anchor');

describe('calculator', () => {

    // Configure the client to use the local cluster.
    const provider = anchor.Provider.local("http://127.0.0.1:8899")
    anchor.setProvider(provider);

    it('Is initialized!', async () => {
        // Add your test here.
        const program = anchor.workspace.Calculator;
        const tx = await program.rpc.initialize();
        console.log("Your transaction signature", tx);
    });
});