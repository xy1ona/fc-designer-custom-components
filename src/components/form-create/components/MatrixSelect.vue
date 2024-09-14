<template>
  <div class="_fc_table_sel_item">
    <el-table
      :data="tables.rows"
      border
      scrollbar-always-on
      size="small">
      <el-table-column fixed>
        <template #default="scope">
          <div class="font16">{{tables.rows[scope.$index].label}}</div>
          <div class="tip">{{tables.rows[scope.$index].info}}</div>
        </template>
      </el-table-column>
      <template v-for="(col,idx) in tables.columns" :key="col.label + idx">
        <el-table-column :label="col.label" :width="clientWidth < 500 ? 55 : 'auto'" align="center">
          <template #header>
            <div> {{col.label}} </div>
            <div v-if="show"> {{col.value || col.value === 0 ? '（'+col.value+'）' : ''}} </div>
            <div class="tip">{{col.info}}</div>
          </template>
          <template #default="scope">
            <el-form-item
              class="el-form-item_radio"
              :prop="'values.' + scope.row.id + '.' + col.id"
              :rules="[{ validator: validateKey, trigger: ['blur', 'change'], message: '', row: scope.row, col: col }]">
              <el-radio class="radio-type" v-model="values[scope.row.id].value" :label="col.id" @change="onChange"></el-radio>
            </el-form-item>
          </template>
        </el-table-column>
      </template>
      <el-table-column v-if="showInput" label="comment" align="center" prop="comment">
        <template #default="scope">
          <el-input class="form_input" v-model="values[scope.row.id].comment"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
const props = defineProps({
  formCreateInject: Object,
  modelValue: { type: Object, default: ()=> {} },
})
const clientWidth = document.documentElement.clientWidth
const emit = defineEmits(['update:modelValue']);

const show = ref(true)
const showInput = ref(false)
const tables = ref({})
/**
 * values
 * "row id": {
    "comment": "",
    "value": "column id"
}
 * */
const values = ref(props.modelValue ? props.modelValue :{})
// config
watch(props.formCreateInject,(newVal,oldVal) => {
  show.value = false
  tables.value = newVal.rule.props.table
  showInput.value = newVal.rule.props.input
  tables.value.rows.forEach(row=> {
    if(!values.value[row.id]) values.value[row.id] = {}  // init value
    if(!showInput.value) values.value[row.id].comment = ''  // reset comment
  })
  show.value = true
},  { immediate: true, deep: true })

watch(props.values,(newVal,oldVal) => {
  update()
})

// validate required
const validateKey = (rule, value, callback)=> {
  const val = values.value && values.value[rule.row.id] || {}
  if (!val.value && props.formCreateInject.rule.$required) {
    callback(new Error('please select'))
  } else {
    callback()
  }
}
const onChange = () => {
  update();
}
const update = ()=> {
  emit('update:modelValue', values.value);
}

</script>

<style scoped lang="scss">
._fc_table_sel_item {
  width: 100%;
  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px #dcdfe6 inset;
  }
  :deep(.el-form-item_radio) {
    .radio-type {
      display: flex; justify-content: center; width: 100%;
    }
    .el-radio .el-radio__label {
      display: none;
    }
    .el-form-item__error {
      top: 0;
    }
  }
  :deep(.el-form-item__content:has(.el-form-item__error)){
    border: 1px solid var(--el-color-danger);
  }
}
</style>
