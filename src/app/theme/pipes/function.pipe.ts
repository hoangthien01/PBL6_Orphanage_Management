import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'function',
})
// NOTE: Use Arrow Function Expression when applying function pipe
export class FunctionPipe implements PipeTransform {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    transform(value: any, handler: (...args: any[]) => any, ...args: any[]): any {
        return handler(value, ...args);
    }
}
