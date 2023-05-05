import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { Category } from '../entities/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _urlService: UrlService, private http: HttpClient) { }

  getAll() {
    return this.http.get<Category[]>(this._urlService.getEndPointCategory());
  }

  insert(category: Category) {
    return this.http.post<Category>(
      this._urlService.getEndPointCategory(),
      category
    );
  }

  getById(id: string) {
    const URL_SERVICE = `${this._urlService.getEndPointCategory() + id}`;
    return this.http.get<Category>(URL_SERVICE);
  }

  getByEventIdAndPresentationId(eventId: number, presentationId: number) {
    const URL_SERVICE = `${this._urlService.getEndPointPubCategory()}event/${eventId}/presentation/${presentationId}`;
    return this.http.get<Category[]>(URL_SERVICE);
  }
}
