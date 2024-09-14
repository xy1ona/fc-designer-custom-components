import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '矩阵填空';
const name = 'MatrixInput';

export default {
    //插入菜单位置
    menu: 'main',
    //图标
    icon: 'icon-input',
    //名称
    label,
    name,
    rule({t}) {
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
                            label: '填空' + value,
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
                props: {defaultValue: {}}
            }
        ]);
    }
};
