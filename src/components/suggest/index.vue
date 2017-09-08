<template>
<div class="v-suggest" :class="skin">
    <input type="input" :placeholder="placeHolder" class="suggest-input" v-model="value" @focus="_onFocus" @keydown="_onKeydown($event)">
    <div class="suggest-panel" v-if="suggestList.length">
        <ul>
            <li v-for="(item, index) in suggestList" :key="index" :class="{'selected': index==currentIndex}" v-html="filterDisplay(item, suggestKey, value)" @click="_onSelect(item)"></li>
        </ul>
    </div>
</div>
</template>

<script>
// suggest.js
import suggest from './suggest.js'
export default suggest
</script>

<style lang="scss" scoped="true" type="text/css">
.ivu-form-item-error .suggest-input {
    border-color: #ed3f14 !important;
}
.v-suggest {
    position: relative;
    display: inline-block;
    .suggest-input {
        outline: 0;
        height: 32px;
        padding: 4px 7px;
        border: 1px solid #dddee1;
        border-radius: 4px;
        width: 100%;
        transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        &:hover {
            border-color: #57a3f3;
        }
    }

    input:-moz-placeholder,
    input::-moz-placeholder,
    input:-ms-input-placeholder,
    input::-webkit-input-placeholder {
        color: #bbbec4;
    }

    .suggest-panel {
        position: absolute;
        top: 32px;
        padding: 5px 0;
        background-color: #ffffff;
        border: 1px solid #dddee1;
        border-radius: 4px;
        width: 100%;
        max-height: 200px;
        overflow: auto;
        z-index: 99;
        transition: all 0.2s ease-in-out;
    }
    ul > li {
        padding: 4px 7px;
        list-style: none;
        line-height: 28px;
        height: 28px;
        vertical-align: middle;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &.selected,
        &:hover {
            background: #f8f8f8;
        }
    }
}
</style>
