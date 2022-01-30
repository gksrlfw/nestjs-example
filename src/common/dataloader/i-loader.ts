/**
 * TODO nestjs-dataloader 를 사용해봅시다.
 *  https://colour-me.tistory.com/1
 */
export interface ILoader {
  /**
   * dataloader 를 위한 batchFn 을 정의합니다.
   * @param keys
   */
  // generateOne<T>(keys: readonly number[]): Promise<T[]>;
  // generateList<T>(keys: readonly number[]): Promise<T[][]>;
  generate(keys: readonly number[]): Promise<any>;
}
