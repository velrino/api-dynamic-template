import * as crypto from 'crypto-js';
import * as _ from 'lodash';

export class UtilsService {
  /**
   * generate hash from password or string
   * @param {string} message
   * @return {string}
   */
  static generateHash(message: string): string {
    return crypto.SHA256(message).toString();
  }

  /**
   * generate random string
   * @param length
   */
  static generateRandomString(length: number) {
    return Math.random()
      .toString(36)
      .replace(/[^a-zA-Z0-9]+/g, '')
      .substr(0, length);
  }

  /**
   * validate text with hash
   * @param {string} message
   * @param {string} hash
   * @return {boolean}
   */
  static validateHash(message: string, hash: string): boolean {
    return UtilsService.generateHash(message) === (hash || '');
  }
}
