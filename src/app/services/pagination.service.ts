import { Injectable } from '@angular/core';

/** PaginationService manages the pagination state (page size and page index) */
@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private pageSize: number = 3;
  private pageIndex: number = 0;

  /**
   * Sets the current page size.
   * 
   * @param size The size of the page to be set.
   */
  setPageSize(size: number): void {
    this.pageSize = size;
  }

  /**
   * Retrieves the current page size.
   * 
   * @returns The current page size.
   */
  getPageSize(): number {
    return this.pageSize;
  }

  /**
   * Sets the current page index.
   * 
   * @param index The index of the page to be set.
   */
  setPageIndex(index: number): void {
    this.pageIndex = index;
  }

  /**
   * Retrieves the current page index.
   * 
   * @returns The current page index.
   */
  getPageIndex(): number {
    return this.pageIndex;
  }
}
