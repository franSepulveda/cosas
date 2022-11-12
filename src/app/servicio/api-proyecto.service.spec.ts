import { TestBed } from '@angular/core/testing';

import { ApiProyectoService } from './api-proyecto.service';

describe('ApiProyectoService', () => {
  let service: ApiProyectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProyectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
