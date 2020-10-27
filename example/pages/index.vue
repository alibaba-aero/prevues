<template>
    <div>My TExt</div>
    <h5>My TEXT</h5>
    <div ref="sd">
        {{ count }}
    </div>
    <button @click="increment">Increment</button>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        return {
            count: ref(1),
            increment: () => count.value++,
        }
    }
}
</script>
