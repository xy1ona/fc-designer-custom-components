import is from '@form-create/utils/lib/type';

export const localeProps = (t, prefix, rules) => {
    return rules.map(rule => {
        if (rule.field === 'formCreate$required') {
            rule.title = t('validate.required') || rule.title;
        } else if (rule.field && rule.field !== '_optionType') {
            rule.title = t('com.' + prefix + '.' + rule.field) || rule.title;
        }
        if (rule.type === 'template' && is.trueArray(rule.children)) {
            rule.children = localeProps(t, prefix, rule.children);
        }
        return rule;
    })
}
