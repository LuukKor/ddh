import { APIList } from '@/types/api';
import { DataAPI } from '@/types/data';
import { List } from '@/types/list';
import { People, PeopleAPI } from '@/types/people';

import { fetcher } from '@/utils/fetcher';

const PEOPLE_RESOURCE = 'people';
const PEOPLE_PER_PAGE = 10;

export class PeopleService {
  private url = process.env.NEXT_PUBLIC_API_URL;

  private getURL(page?: number): string {
    if (!this.url) {
      throw new Error('No exist env: NEXT_PUBLIC_API_URL');
    }
    const apiURL = new URL(this.url + PEOPLE_RESOURCE);

    if (page) {
      apiURL.searchParams.append('page', page.toString());
    }

    return apiURL.href;
  }

  async getPage(page: number = 1): Promise<List<People>> {
    const url = this.getURL(page);

    try {
      const response = await fetcher<APIList<PeopleAPI>>(url);

      const requiredFields: Partial<keyof People>[] = ['name'];

      if (!response.results) throw new Error('No data');

      requiredFields.forEach((field) => {
        if (!response.results.every((x) => x[field])) throw new Error(`No ${field} field`);
      });

      return {
        page: page,
        perPage: PEOPLE_PER_PAGE,
        totalPage: Math.ceil(response.count / PEOPLE_PER_PAGE),
        list: response.results.map((x) => ({ name: x.name, url: x.url })),
      };
    } catch (e) {
      throw new Error(`Error while fetching ${e}`);
    }
  }

  async getPerson(id: string): Promise<PeopleAPI> {
    const apiURL = new URL(`${this.url}${PEOPLE_RESOURCE}/${id}`);

    try {
      const response = await fetcher<PeopleAPI>(apiURL.href);

      if (!response) throw new Error('No data');

      return response;
    } catch (e) {
      throw new Error(`Error while fetching ${e}`);
    }
  }

  async getDataByUrl(url: string): Promise<APIList<DataAPI>> {
    try {
      const response = await fetcher<APIList<any>>(url);

      if (!response) throw new Error('No data');

      return response;
    } catch (e) {
      throw new Error(`Error while fetching ${e}`);
    }
  }
}
