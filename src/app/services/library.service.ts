import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LibraryService {
    constructor(private http: HttpClient) {
    }

    get(url: string) {
        return this.http.get(url);
    }

    post(url: string, body) {
        let header = { "Content-Type": "application/json"};

        return this.http.post(url, body, { headers: header });
    }

    delete(url: string) {
        return this.http.delete(url);
    }
}

