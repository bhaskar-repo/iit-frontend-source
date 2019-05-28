import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'addSpecialCharPipe'
})
export class AddCharPipe implements PipeTransform {

    transform(value: string, character: string): string {

        return character.concat(value);

    }
}