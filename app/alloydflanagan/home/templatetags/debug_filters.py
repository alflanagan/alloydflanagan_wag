from django import template

register = template.Library()

@register.filter
def dir_list(value):
    # TODO: convert all entities
    return str(dir(value)).replace("'", "")
