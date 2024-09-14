<template>
  <div class="_fc_table_opt">
    <el-table
        :data="tables.rows"
        border
        size="small"
        style="width: 100%">
      <el-table-column>
        <template #default="scope">
          <span>{{tables.rows[scope.$index].label}}</span>
        </template>
      </el-table-column>
      <template v-for="(col,idx) in tables.columns" :key="col.label + idx">
        <el-table-column :label="col.label" align="center">
          <template #header>
            <div>
              {{col.label}}
            </div>
            <div v-if="show">
              {{col.value || col.value === 0 ? '（'+col.value+'）' : ''}}
            </div>
          </template>
          <template #default="scope">
              <el-form-item
                  :prop="'values.' + scope.row.id + '.' + col.id"
                  :rules="[{ validator: validateKey, trigger: ['blur', 'change'], row: scope.row, col: col }]">
                <el-input :modelValue="values[scope.row.id] && values[scope.row.id][col.id] || ''"
                          @Update:modelValue="(n)=>(n, onInput(n, scope.row, col))"></el-input>
              </el-form-item>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup>
const props = defineProps({
  formCreateInject: Object,
  modelValue: {
    type: Object,
    default: ()=> {}
  },
})
/**
 * values
 * "row id": {
    "column1 id": "input value",
    "column2 id": "input value",
}
 * */
const data = reactive({
  show: true,
  tables: props.formCreateInject.rule.props.table,
  values: props.modelValue ? props.modelValue : {},
});
const { show, tables, values } = toRefs(data);
const emit = defineEmits(['update:modelValue']);

watch(props.formCreateInject,(newVal,oldVal) => {
  show.value = false
  tables.value = newVal.rule.props.table
  show.value = true
})
watch(props.values,(newVal,oldVal) => {
  update()
})

// validate required
const validateKey = (rule, value, callback)=> {
  const val = values.value[rule.row.id] && values.value[rule.row.id][rule.col.id]
  if (!val && props.formCreateInject.rule.$required) {
    callback(new Error('please input'))
  } else {
    callback()
  }
}

//  input event
const onInput = (val, row, col) => {
  if(!values.value[row.id]) values.value[row.id] = {}
  values.value[row.id][col.id] = val
  update();
}

const update = ()=> {
  emit('update:modelValue', values.value);
}

</script>

<style scoped>
._fc_table_opt {
  width: 100%;
}
</style>
