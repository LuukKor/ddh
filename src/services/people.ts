import { APIList } from '@/types/api';
import { List } from '@/types/list';
import { People, PeopleAPI } from '@/types/people';

import { fetcher } from '@/utils/fetcher';

const PEOPLE_RESOURCE = 'people';

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
        page: 1,
        perPage: 10,
        totalPage: 1,
        list: response.results.map((x) => ({ name: x.name })),
      };
    } catch (e) {
      throw new Error(`Error while fetching ${e}`);
    }
  }
}
