'use strict'

class Profile {
    constructor({username, name, password}) {
        this.login = username;
        this.name = name;
        this.password = password;
    }

    addNewUser (callback) {
        console.log(`Adding ${this.login}`);
        return ApiConnector.createUser({ username: this.login, name: this.name, password: this.password }, (err, data) => {
            console.log(`Added user ${this.login}`);
            callback(err, data);
        });
    }

    auth (callback) {
        console.log(`Authorization ${this.login}`)
        return ApiConnector.performLogin({username: this.login, password: this.password}, (err, data) => {
            console.log(`User ${this.login} authorized`);
            callback(err, data);
        });
    }

    addMoney ({currency, amount }, callback) {
        console.log(`Adding ${amount} of ${currency} to ${this.name}`);
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Added ${amount} of ${currency} to ${this.login}`);
            callback(err, data);
        });
    }

    convertCurrency ({fromCurrency, targetCurrency, targetAmount}, callback) {
        console.log(`Converting ${targetAmount} of ${fromCurrency} to ${targetCurrency}`);
        return ApiConnector.convertMoney({fromCurrency, targetCurrency, targetAmount}, (err, date) => {
            console.log(`Converted ${targetAmount} of ${fromCurrency} to ${targetCurrency}`);
            callback(err, date);
        });
    }

    transferToken ({to, amount}, callback) {
        console.log(`Transferring ${amount} to ${to}`);
        return ApiConnector.transferMoney({to, amount}, (err, data) => {
            console.log(`Transferred ${amount} to ${to}`);
            callback(err, data);
        });
    }
}

const getCurrency = (callback) => {
    console.log(`Getting the exchange rate`);
    return ApiConnector.getStocks((err,data) => {
        console.log(`Got the exchange rate`);
        callback(err, data);
    });
}

function main(){
    const ivan = new Profile({
        username: 'ivan',
        name: { firstName: 'Ivan', lastName: 'Chernyshev' },
        password: 'ivanspass',
    });

    const sergey = new Profile({
        username: 'sergey89',
        name: {firstName: 'Sergey', lastName: 'Petrov'},
        password: 'qwerty89',
    })

    ivan.addNewUser((err, data) => {
        if(err) {
            console.error(`error creating user`);
        } else {
            console.log(`user is created`);

            this.auth((err, data) => {
                if(err) {
                    console.error(`error authorization`);
                } else {
                    console.log(`user authorized`);

                    this.addMoney({ currency: 'RUB', amount: 100000 }, (err, data) => {
                        if (err) {
                            console.error(`Error during adding money to ${username}`);
                        } else {
                            console.log(`Added ${amount} ${currency} to ${username}`);

                            const currencyList = getCurrency();
                            let convertSum = this.addMoney.amount * currencyList.RUB_NETCOIN;

                            this.convertCurrency({fromCurrency: 'RUB', targetCurrency: 'NETCOIN', targetAmount: convertSum}, (err, data) => {
                                if(err) {
                                    console.error(`Conversion error`);
                                } else {
                                    console.log(`Converted from RUB to NETCOIN`);

                                    sergey.addNewUser((err, data) => {
                                        if(err) {
                                            console.error(`error creating user`);
                                        } else {
                                            console.log(`user is created`);

                                            this.transferToken({to: sergey, amount: convertSum}, (err, data) => {
                                                if(err) {
                                                    console.error(`Transfer error`);
                                                } else {
                                                    console.log(`Transfer money`)
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }

            })
        }
    });
}

main();