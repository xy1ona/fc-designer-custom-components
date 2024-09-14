import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils/index';

const label = '矩阵选择';
const name = 'MatrixSelect';

export default {
    //插入菜单位置
    menu: 'main',
    //图标
    icon: 'icon-select',
    //名称
    label,
    //id,唯一!
    name,
    //定义组件的渲染规则
    rule({ t }) {
        return {
            type: name,
            field: uniqueId(),
            title: label,
            info: '',
            $required: false,
            props: {
                table: {
                    rows: [1, 2, 3].map(value => {
                        return {
                            label: '矩阵' + value,
                            info: '',
                            id: uniqueId(),
                        }
                    }),
                    columns: [1, 2, 3].map(value => {
                        return {
                            label: '选择' + value,
                            value: '',
                            info: '',
                            id: uniqueId(),
                        }
                    })
                }
            }
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'ConfigMatrixOption',
                field: 'table',
                title: '',
                props: { defaultValue: {} }
            },
            {
                type: 'switch',
                field: 'input',
                title: '是否允许输入',
            }
        ]);
    }
}
