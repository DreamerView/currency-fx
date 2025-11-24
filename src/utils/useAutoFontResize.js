import { ref, onMounted, onBeforeUnmount, watch } from "vue";

export function useAutoFontResize(inputRef, modelValue, options = {}) {
    const baseFont = options.baseFont || 48;
    const minFont = options.minFont || 20;
    const fontSize = ref(baseFont);

    // скрытый span для замера ширины текста
    let measureSpan = null;

    function createMeasureSpan(el) {
        measureSpan = document.createElement("span");
        measureSpan.style.position = "absolute";
        measureSpan.style.visibility = "hidden";
        measureSpan.style.whiteSpace = "pre";
        measureSpan.style.fontFamily = window.getComputedStyle(el).fontFamily;
        measureSpan.style.fontWeight = window.getComputedStyle(el).fontWeight;
        document.body.appendChild(measureSpan);
    }

    function autoResizeFont() {
        const el = inputRef.value;
        if (!el || !measureSpan) return;

        const inputWidth = el.clientWidth;
        let font = baseFont;

        measureSpan.style.fontSize = font + "px";
        measureSpan.textContent = el.value || "0";

        // уменьшаем шрифт пока текст не влезает
        while (font > minFont) {
            measureSpan.style.fontSize = font + "px";

            if (measureSpan.offsetWidth <= inputWidth) break;

            font -= 1;
        }

        fontSize.value = font;
        el.style.fontSize = font + "px";
    }

    onMounted(() => {
        if (!inputRef.value) return;
        createMeasureSpan(inputRef.value);

        inputRef.value.addEventListener("input", autoResizeFont);
        window.addEventListener("resize", autoResizeFont);

        autoResizeFont();
    });

    onBeforeUnmount(() => {
        if (!inputRef.value) return;

        inputRef.value.removeEventListener("input", autoResizeFont);
        window.removeEventListener("resize", autoResizeFont);

        if (measureSpan) {
            measureSpan.remove();
            measureSpan = null;
        }
    });

    watch(modelValue, () => autoResizeFont());

    return { fontSize, autoResizeFont };
}
