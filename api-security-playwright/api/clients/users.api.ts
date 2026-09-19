import { APIRequestContext } from '@playwright/test';
import { BaseApi } from './base.api';
import { environmentConfig } from '../../config/environments';
import { AuthApi } from './auth.api';

export class UsersApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request);
  }

  private getAuthHeader() {
    const token = AuthApi.getStoredToken();
    return token ? `Bearer ${token}` : undefined;
  }

  async getUsers() {
    return this.get(environmentConfig.usersEndpoint, {
      auth: this.getAuthHeader(),
      failOnStatusCode: false,
    });
  }

  async getUser(id: string | number) {
    return this.get(`${environmentConfig.usersEndpoint}/${id}`, {
      auth: this.getAuthHeader(),
      failOnStatusCode: false,
    });
  }

  async createUser(data: Record<string, unknown>) {
    return this.post(environmentConfig.usersEndpoint, {
      data,
      auth: this.getAuthHeader(),
      failOnStatusCode: false,
    });
  }

  async updateUser(id: string | number, data: Record<string, unknown>) {
    return this.put(`${environmentConfig.usersEndpoint}/${id}`, {
      data,
      auth: this.getAuthHeader(),
      failOnStatusCode: false,
    });
  }

  async patchUser(id: string | number, data: Record<string, unknown>) {
    return this.patch(`${environmentConfig.usersEndpoint}/${id}`, {
      data,
      auth: this.getAuthHeader(),
      failOnStatusCode: false,
    });
  }

  async deleteUser(id: string | number) {
    return this.delete(`${environmentConfig.usersEndpoint}/${id}`, {
      auth: this.getAuthHeader(),
      failOnStatusCode: false,
    });
  }
}
