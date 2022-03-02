const assert = require('assert');
const anchor = require('@project-serum/anchor');
const {
    SystemProgram
} = anchor.web3;

describe('calculator', () => {
    // Configure the client to use the local cluster.
    const provider = anchor.Provider.local('http://127.0.0.1:8899');
    anchor.setProvider(provider);

    const calculator = anchor.web3.Keypair.generate();
    const program = anchor.workspace.Calculator;

    it('Creates a calulator', async () => {
        /**
         * Make Remote Procedure Calls (RPCs) to access the function.
         * Create accounts using web3 library and passes it as parameters to the function.
         */
        await program.rpc.create('Hey kids, you like violence?', {
            accounts: {
                calculator: calculator.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            },
            signers: [calculator],
        });

        // Now we grab hold of the calculator account and check if its greeting variable has been changed.
        const account = await program.account.calculator.fetch(
            calculator.publicKey
        );
        assert.ok(account.greeting === 'Hey kids, you like violence?');
        _calculator = calculator; // Storing for future uses
    });

    it('Adds two numbers', async () => {
        await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
            accounts: {
                calculator: calculator.publicKey,
            },
        });

        const account = await program.account.calculator.fetch(
            calculator.publicKey
        )
        assert.ok(account.result.eq(new anchor.BN(5)))
        assert.ok(account.greeting === "Hey kids, you like violence?")
    });

    it('Multiplies two numbers', async () => {
        await program.rpc.multiply(new anchor.BN(2), new anchor.BN(3), {
            accounts: {
                calculator: calculator.publicKey
            }
        })

        const account = await program.account.calculator.fetch(
            calculator.publicKey
        )

        assert.ok(account.result.eq(new anchor.BN(6)));
        assert.ok(!account.result.eq(new anchor.BN(13)));
        assert.ok(account.greeting === "Hey kids, you like violence?")
    });

    it('Subtracts two numbers', async () => {
        await program.rpc.subtract(new anchor.BN(5), new anchor.BN(3), {
            accounts: {
                calculator: calculator.publicKey
            }
        })

        const account = await program.account.calculator.fetch(
            calculator.publicKey
        )

        assert.ok(account.result.eq(new anchor.BN(2)))
        assert.ok(!account.result.eq(new anchor.BN(5)))
        assert.ok(!account.result.eq(new anchor.BN(-2)))
        assert.ok(account.greeting === 'Hey kids, you like violence?');
    });

    it('Divides two numbers', async () => {
        await program.rpc.divide(new anchor.BN(7), new anchor.BN(3), {
            accounts: {
                calculator: calculator.publicKey
            }
        })

        const account = await program.account.calculator.fetch(
            calculator.publicKey
        )

        assert.ok(account.result.eq(new anchor.BN(2)))
        assert.ok(account.remainder.eq(new anchor.BN(1)))
        assert.ok(!account.result.eq(new anchor.BN(123)))
        assert.ok(account.greeting === 'Hey kids, you like violence?');
    });
});