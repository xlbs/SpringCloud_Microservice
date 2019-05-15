export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_PAGE_SIZE = "SET_PAGE_SIZE";

export let currentPage = 1;
export let pageSize = 10;

/**
 * 设置 当前页
 * @param data
 * @returns {{type: string, currentPage: *}}
 */
export function setCurrentPage(data) {
    currentPage = data;
    return {
        type: SET_CURRENT_PAGE,
        currentPage: currentPage,
    }
}

/**
 * 设置 几条/每页
 * @param data
 * @returns {{type: string, pageSize: *}}
 */
export function setPageSize(data) {
    pageSize = data;
    return {
        type: SET_PAGE_SIZE,
        pageSize: pageSize,
    }
}