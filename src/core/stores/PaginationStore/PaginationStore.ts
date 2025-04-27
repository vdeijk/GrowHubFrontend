import { makeAutoObservable } from 'mobx';

export class PaginationStore {
  public currentPage: number = 1;
  public totalPages: number = 1;
  public pageSize: number = 10;

  constructor() {
    makeAutoObservable(this);
  }

  public setCurrentPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  public setTotalPages(totalItems: number) {
    this.totalPages = Math.ceil(totalItems / this.pageSize);
  }

  public setPageSize(size: number) {
    this.pageSize = size;
    this.totalPages = Math.ceil((this.totalPages * this.pageSize) / size);
  }
}

const paginationStore = new PaginationStore();
export default paginationStore;
