import { Block, Child } from "../../type/index";
import { generateId } from "../id/index";

/**
 * 트리를 순회하며 블록을 수정합니다.
 *
 * @param blocks 순회할 블록 배열
 * @param mapper 각 블록에 적용할 변환 함수
 *
 * @returns 수정된 블록 배열을 반환합니다.
 */
export const traverseAndMap = (
  blocks: Block[],
  mapper: (block: Block) => Block,
): Block[] => {
  return blocks.map((block) => {
    const updatedBlock = mapper(block);

    // 만약 블록에 자식 요소가 존재한다면, 자식 또한 탐색을 진행합니다.
    if (updatedBlock.children && updatedBlock.children.length > 0) {
      // 탐색을 진행하며 인자로 받은 mapper 함수를 기반으로 매핑을 진행합니다.
      return {
        ...updatedBlock,
        children: updatedBlock.children.map((child) => ({
          ...child,
          // 매핑 함수는 배열을 인자로 받기에 배열에 담은 후 0번째 인덱스로 아이템을 가져옵ㄴ니다.
          block: traverseAndMap([child.block], mapper)[0],
        })),
      };
    }

    // 자식이 없다면 업데이트된 블록을 그대로 반환합니다.
    return updatedBlock;
  });
};

/**
 * 트리를 순회하며 조건에 맞지 않는 블록을 필터링합니다.
 *
 * @param blocks 순회할 블록 배열
 * @param predicate 유지할 조건을 검사하는 함수
 *
 * @returns 필터링된 블록 배열
 */
export const traverseAndFilter = (
  blocks: Block[],
  predicate: (block: Block) => boolean,
): Block[] => {
  // 현재 Depth에서 조건에 맞지 않는 블럭을 필터링합니다.
  const filtered = blocks.filter(predicate);

  // 남은 블럭 내부에서 자식 블럭 들의 필터링을 진행합니다.
  return filtered.map((block) => {
    if (block.children && block.children.length > 0) {
      const remainingChildren = block.children.filter((child) =>
        predicate(child.block),
      );

      return {
        ...block,
        children: remainingChildren.map((child) => ({
          ...child,
          block: traverseAndFilter([child.block], predicate)[0],
        })),
      };
    }

    // 자식이 존재하지 않는 경우 현재 블록을 그대로 반환합니다.
    return block;
  });
};

/**
 * 특정 블록의 가장 마지막 자식의 ID를 찾습니다.
 */
export const getLastDescendantId = (block: Block): string => {
  if (block.children && block.children.length > 0) {
    // 자식 요소가 존재하면 가장 마지막 자식 요소의 아이디를 반환합니다.
    const last = block.children[block.children.length - 1];

    return getLastDescendantId(last.block);
  }

  // 자식 요소가 존재하지 않으면 인자로 받은 블럭의 아이디를 반환합니다.
  return block.id;
};

/**
 * 특정 ID를 가진 블록의 '이전 블록 ID'를 찾습니다.
 *
 * @param blocks 전체 블록 트리
 * @param targetId 찾고자 하는 기준 블록 ID
 * @param parentId 현재 탐색 중인 블록의 부모 ID (Optional)
 *
 * @returns 이전 블록의 ID를 반환합니다. 존재하지 않으면 undefined를 반환합니다.
 */
export const findPrevBlockId = (
  blocks: Block[],
  targetId: string,
  parentId?: string,
): string | undefined => {
  for (let index = 0; index < blocks.length; index++) {
    const currentBlock = blocks[index];

    // 현재 블록이 찾는 대상일 경우
    if (currentBlock.id === targetId) {
      // 만약 요소가 첫 번째 요소인 경우 부모의 아이디를 반환합니다.
      if (index === 0) {
        return parentId;
      }

      // 이전 인덱스의 아이템이 자식을 가지고 있다면, 커서를 자식에게 이동시킵니다.
      // 만약 자식이 존재하지 않으면 이전 인덱스 블럭의 id를 반환합니다.
      return getLastDescendantId(blocks[index - 1]);
    }

    // 찾는 대상이 아니지만 내부에 자식이 존재하는 경우 자식에서 요소를 찾아보고, 찾았다면 그 블럭의 아이디를 반환합니다.
    if (currentBlock.children && currentBlock.children.length > 0) {
      const childBlocks = currentBlock.children.map((child) => child.block);
      const found = findPrevBlockId(childBlocks, targetId, currentBlock.id);

      if (found) {
        return found;
      }
    }
  }

  // 탐색 결과가 존재하지 않으면 undefined를 반환합니다.
  return undefined;
};

/**
 * 트리를 순회하며 기준 블록(prevId)의 바로 다음 위치에 새 블록을 삽입합니다.
 *
 * @param blocks 전체 블록 트리
 * @param prevId 기준이 되는 이전 블록의 ID
 * @param block 삽입할 새 블록 객체
 *
 * @returns 새 블록이 삽입된 전체 블럭 구조를 반환합니다.
 */
export const insertBlockAfter = (
  blocks: Block[],
  prevId: string,
  block: Block,
): Block[] => {
  // 현재 순회 중인 블럭의 배열에서 기준이 되는 블럭을 찾습니다.
  const index = blocks.findIndex((node) => node.id === prevId);

  // 만약 블럭을 찾았다면, 기준 블럭의 뒤에 새로운 블럭을 추가합니다.
  if (index !== -1) {
    const update = [...blocks];
    update.splice(index + 1, 0, block);
    return update;
  }

  // 현재 순회 중인 depth에서 기준 블럭이 존재하지 않는다면 자식 요소의 탐색을 진행합니다.
  return blocks.map((item) => {
    // 자식 요소가 존재하지 않는 경우 탐색을 진행하지 않고 기존의 블럭을 그대로 반환합니다.
    if (item.children && item.children.length > 0) {
      const childIndex = item.children.findIndex(
        (child) => child.block.id === prevId,
      );

      // 자식 배열에서 기준 블럭을 찾은 경우
      if (childIndex !== -1) {
        const update = [...item.children];
        const wrapper: Child = {
          id: generateId(),
          block: block,
        };

        // 찾은 자식의 바로 뒤에 새 블럭을 삽입합니다.
        update.splice(childIndex + 1, 0, wrapper);

        return { ...item, children: update };
      }

      // 만약 자식 중에도 블럭이 존재하지 않는다면 더욱 아래의 Depth로 기준 블럭을 찾아 내려갑니다.
      return {
        ...item,
        children: item.children.map((childWrapper) => ({
          ...childWrapper,
          block: insertBlockAfter([childWrapper.block], prevId, block)[0],
        })),
      };
    }

    return item;
  });
};
