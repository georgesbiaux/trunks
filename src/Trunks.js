import arg from 'arg';

export class Trunks {
    constructor(rawArgs) {
        this.options = Trunks.parseArgumentsIntoOptions(rawArgs);
    }

    run() {
        console.log(this.options);
    }

    static parseArgumentsIntoOptions(rawArgs) {
      const args = arg(
        {},
        {
          argv: rawArgs.slice(2),
        }
      );

      return {
        command: args._[0],
      };
    }
}
