import { makeAutoObservable } from 'mobx';
import EventBus from '../../services/EventTarget';

export class PaginationStore {
  public currentPage: number = 1;
  public totalPages: number = 1;
  public pageSize: number = 5;

  constructor() {
    makeAutoObservable(this);
  }

  public setCurrentPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      EventBus.dispatchEvent('pagination:currentPageChanged', undefined);
    }
  }

  public setTotalPages(totalItems: number) {
    this.totalPages = Math.ceil(totalItems / this.pageSize);
  }

  public setPageSize(size: number) {
    this.pageSize = size;
    this.totalPages = Math.ceil((this.totalPages * this.pageSize) / size);
  }

  public paginateItems = <T>(filteredItems: T[]) => {
    this.setTotalPages(filteredItems.length);

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    return filteredItems.slice(startIndex, endIndex);
  };
}

const paginationStore = new PaginationStore();
export default paginationStore;
