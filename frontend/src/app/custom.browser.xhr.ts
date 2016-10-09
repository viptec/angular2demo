import { Injectable } from '@angular/core';
import { BrowserXhr } from '@angular/http';
 
/**
 * Override default browser to send spring security tokens
 */
@Injectable()
export class CustomBrowserXhr extends BrowserXhr {
 
    constructor() {
        super();
    }
 
    build(): any {
        let xhr = super.build();
        xhr.withCredentials = true;
        return <any>(xhr);
    }
}