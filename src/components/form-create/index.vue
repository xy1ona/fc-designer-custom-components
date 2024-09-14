<script setup lang="ts">
import FcDesigner from '@form-create/designer'
//导入自定义组件
import MatrixSelect from './components/MatrixSelect';
import matrixSelectRule from './config/rule/matrixSelect';
import ConfigMatrixOption from './components/ConfigMatrixOption';

import MatrixInput from './components/MatrixInput';
import matrixInputRule from './config/rule/matrixInput';

// 可以在此处获取设计器实例或进行其他操作
const designer = ref(null);
//挂载自定义组件
FcDesigner.component('ConfigMatrixOption', ConfigMatrixOption);
FcDesigner.component('MatrixInput', MatrixInput);
FcDesigner.component('MatrixSelect', MatrixSelect);

onMounted(() => {
  // 挂载拖拽规则
  designer.value.addComponent(matrixInputRule);
  designer.value.addComponent(matrixSelectRule);
});

</script>

<template>
  <fc-designer ref="designer" height="100vh" style='flex: auto !important;'/>
</template>

<style scoped>

</style>
