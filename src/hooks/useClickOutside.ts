import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'


/**
 * @param elementRef 元素的ref
 * @param callback 回调函数
 * @description
 * 1. 监听点击事件
 * 2. 判断元素是否包含点击的元素
 * 3. 如果不包含，则执行回调函数
 * 4. 如果包含，则不执行回调函数
 * 5. 卸载时，移除事件监听
 */
const useClickOutside = (elementRef: Ref<undefined | HTMLElement>, callback: (e: MouseEvent) => void) => {
  const handler = (e: MouseEvent) => {
    // contains 是 HTMLElement 对象的一个方法，用于判断一个元素是否是另一个元素的后代元素。
    // 如果参数指定的元素是调用该方法元素的后代元素（包括元素本身），则返回 true；否则返回 false。
    // 这里使用 elementRef.value.contains(e.target as HTMLElement) 来判断点击事件的目标元素是否在 elementRef 引用的元素内部。
    // 如果不在内部，则执行回调函数。
    if (elementRef.value && !elementRef.value.contains(e.target as HTMLElement)) {
      callback(e)
    }
  }

  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}

export default useClickOutside

