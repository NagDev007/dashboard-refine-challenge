import chalk from "chalk";

export default class Logging {
  public static log = (args: string) => this.info(args);

  public static info = (args: string) =>
    console.log(
      chalk.blue(`[${new Date().toLocaleDateString()}] [INFO]`),
      typeof args === "string" ? chalk.blueBright(args) : args
    );

  public static warn = (args: string) =>
    console.log(
      chalk.yellow(`[${new Date().toLocaleDateString()}] [INFO]`),
      typeof args === "string" ? chalk.yellowBright(args) : args
    );

  public static error = (args: string) =>
    console.log(
      chalk.red(`[${new Date().toLocaleDateString()}] [INFO]`),
      typeof args === "string" ? chalk.redBright(args) : args
    );
}
