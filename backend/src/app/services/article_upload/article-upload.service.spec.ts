import { TestBed, inject } from '@angular/core/testing';

import { ArticleUploadService } from './article-upload.service';

describe('ArticleUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleUploadService]
    });
  });

  it('should be created', inject([ArticleUploadService], (service: ArticleUploadService) => {
    expect(service).toBeTruthy();
  }));
});
