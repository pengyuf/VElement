import { isRef, onBeforeUnmount, onMounted, unref, watch, type Ref } from "vue";

export default function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (event: Event) => void,
) {
  if (isRef(target)) {
    watch(target, (newTarget, oldTarget) => {
      oldTarget?.removeEventListener(event, handler)
      newTarget?.addEventListener(event, handler)
    })
  } else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }

  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}
