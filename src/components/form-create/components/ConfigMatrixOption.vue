<template>
  <div class="_fc-matrix-config-option">
    <div>
      <el-divider content-position="center">row data</el-divider>
      <el-row :span="24" :gutter="20" >
        <el-col :span="10"> label </el-col>
        <el-col :span="10"> info </el-col>
        <el-col :span="4"> {{ t('tableOptions.handle') }} </el-col>
      </el-row>
      <el-row :gutter="10" class="select-item" v-for="(item, index) in tables.rows">
        <el-col :span="10">
          <el-input type="text" v-model="item.label" placeholder="label" />
        </el-col>
        <el-col :span="11">
          <el-input type="text" v-model="item.info" placeholder="" />
        </el-col>
        <el-col :span="2">
          <i class="fc-icon icon-delete" @click="delRow(index)"></i>
        </el-col>
      </el-row>
      <el-row>
        <el-button link type="primary" @click="addRow"><i class="fc-icon icon-add" ></i>{{ t('tableOptions.add') }}</el-button>
      </el-row>
    </div>

    <div>
      <el-divider content-position="center">options</el-divider>
      <el-row :span="24" :gutter="20" >
        <el-col :span="8"> label </el-col>
        <el-col :span="5"> value </el-col>
        <el-col :span="7"> info </el-col>
        <el-col :span="4"> {{ t('tableOptions.handle') }} </el-col>
      </el-row>
      <el-row :gutter="10" class="select-item" v-for="(item, index) in tables.columns">
        <el-col :span="8">
          <el-input type="text" v-model="item.label" placeholder="label" />
        </el-col>
        <el-col :span="5">
          <el-input type="number" :min="0" v-model="item.value" placeholder="" />
        </el-col>
        <el-col :span="8">
          <el-input :min="0" v-model="item.info" placeholder="" />
        </el-col>
        <el-col :span="2">
          <i class="fc-icon icon-delete" @click="delColumn(index)"></i>
        </el-col>
      </el-row>
      <el-row>
        <el-button link type="primary" @click="addColumn"><i class="fc-icon icon-add" ></i>{{ t('tableOptions.add') }}</el-button>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import uniqueId from '@form-create/utils/lib/unique';
const emit = defineEmits(['update:modelValue']);
const designer = inject('designer');
const t = designer.setupState.t;

const defaultTable = {
  rows: [],
  columns: []
}
const props = defineProps({
  formCreateInject: Object,
  modelValue: { type: Object, default: ()=> [] },
})

/**
 * tables data
 * @type {{rows: Array, columns: Array}}
 * @example
 * {
    "rows": [
        {
            "label": "矩阵1",
            "info": "",
            "id": "Fefhm11u8vzfajc"
        }
    ],
    "columns": [
        {
            "label": "选择1",
            "value": "",
            "info": "",
            "id": "Fj5om11u8vzfamc"
        }
    ]
}* */
const tables = ref(props.modelValue ? props.modelValue : defaultTable)

watch(tables.value,(newVal,oldVal) => {
  update()
},  { deep: true })

watch(props.modelValue,(newVal,oldVal) => {
  tables.value = newVal ? newVal : defaultTable
},  { immediate: true, deep: true })

// add one column
const addColumn = () => {
  tables.value.columns.push({
    label: '',
    value: '',
    id: uniqueId()
  })
}
// add one row
const addRow = () => {
  tables.value.rows.push({
    label: '',
    id: uniqueId()
  })
}
// delete one row
const delRow = (index) => {
  tables.value.rows.splice(index, 1)
}
// delete one column
const delColumn = (index) => {
  tables.value.columns.splice(index, 1)
}
const update = ()=> {
  emit('update:modelValue', tables.value);
}

</script>

<style lang="scss" scoped>
._fc-matrix-config-option {
  width: 100%;
  .select-item {
    display: flex;
  }
}

</style>
