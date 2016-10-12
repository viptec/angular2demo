import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../service/translate.service'; // our translate service

@Pipe({
    name: 'translate',
    pure: false // impure pipe, update value when we change language
})

export class TranslatePipe implements PipeTransform {

	constructor(private _translate: TranslateService) { }

	transform(value: string, arg1: any, arg2:any, arg3: any): any {
		if (!value) return;
		
		let translated = this._translate.instant(value);
		if (arg1){
			translated = translated.replace("$0$", arg1);
		}
		if (arg2){
			translated = translated.replace("$1$", arg2);
		}
		if (arg3){
			translated = translated.replace("$2$", arg3);
		}
		
		return translated;
	}
}