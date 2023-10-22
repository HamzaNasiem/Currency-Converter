import inquirer from "inquirer";
import chalk from "chalk";
let apiKey = "https://v6.exchangerate-api.com/v6/2b4a5d94e96332dda67c6a29/latest/PKR";
let fetchData = async (data) => {
    let fatchData = await fetch(data);
    let response = await fatchData.json();
    return response.conversion_rates;
};
async function main() {
    let data = await fetchData(apiKey);
    let countries = Object.keys(data);
    let firstCountry = await inquirer.prompt({
        type: "list",
        name: "name",
        message: "Converting from",
        choices: countries,
    });
    let userMoney = await inquirer.prompt({
        type: "number",
        name: "currency",
        message: `Please enter the amount in ${chalk.greenBright.bold(firstCountry.name)}:`,
    });
    let secondCountry = await inquirer.prompt({
        type: "list",
        name: "name",
        message: "Converting to",
        choices: countries,
    });
    let cnv = `https://v6.exchangerate-api.com/v6/2b4a5d94e96332dda67c6a29/pair/${firstCountry.name}/${secondCountry.name}`;
    // Add code to fetch the conversion rate and calculate the converted amount
    let cnvData = await fetch(cnv);
    let response = await cnvData.json();
    let rate = response.conversion_rate;
    let convertedAmount = userMoney.currency * rate;
    console.log(`Converting ${chalk.greenBright.bold(userMoney.currency)} ${chalk.greenBright.bold(firstCountry.name)} to ${chalk.greenBright.bold(secondCountry.name)}:`);
    console.log(`${chalk.greenBright.bold(userMoney.currency)} ${chalk.greenBright.bold(firstCountry.name)} = ${chalk.greenBright.bold(convertedAmount)} ${chalk.greenBright.bold(secondCountry.name)}`);
}
main().catch(error => {
    console.error("An error occurred:", error);
});
