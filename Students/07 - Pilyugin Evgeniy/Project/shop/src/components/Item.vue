<template>
    <div class="item" v-bind:class="getClassName">
        <img :src="getImgSrc" :alt="item.name">

        <template v-if="type==='catalog'">
            <div class="info">
                <h4 class="title">{{ item.name }}</h4>
                <h5 class="price">${{ item.price }}</h5>
            </div>
            <button class="btn-add" @click="addItemInBasket(item)">add to cart</button>
        </template>

        <template v-if="type==='basket'">
            <div class="info">
                <h4 class="title">{{ item.name }}</h4>
                <h5 class="price price-basket">price: ${{ item.price }}</h5>
                <div class="del">
                    <h6 class="count">total: {{ item.counter }}</h6>
                    <i class="far fa-times-circle" @click="deleteItem(item)"></i>
                </div>
            </div>
        </template>

        <template v-if="type==='newItem'">
            <div class="info">
                <h4 class="title">Name:</h4>
                <input class="itemName" type="text" v-model="item.name">
            </div>
            <div class="info">
                <h5 class="price">Price:</h5>
                <input class="itemPrice" type="number" v-model="item.price">
            </div>
            <button class="btn-add" @click="addNewItem(item)">save item</button>
        </template>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'catalog'
            },
            item: {
                type: Object,
                default() {
                    return {}
                }
            },
        },
        computed: {
            getClassName() {
                switch (this.type) {
                    case 'catalog':
                        return 'item-catalog';
                    case 'basket':
                        return 'item-basket';
                    case 'newItem':
                        return 'item-catalog';
                }
            },
            getImgSrc() {
                switch (this.type) {
                    case 'catalog':
                        return 'https://via.placeholder.com/200x260/c5c68a/ffffff/?text=E-SHOP';
                    case 'basket':
                        return 'https://via.placeholder.com/160x130/c5c68a/ffffff/?text=E-SHOP';
                    case 'newItem':
                        return 'https://placehold.it/200x200?text=E-SHOP';
                }
            }
        },
        methods: {
            addItemInBasket(item) {
                this.$emit(`additem`, item);
            },
            addNewItem(item) {
                this.$emit(`addnewitem`, item)
                    .then(this.item = {});
            },
            deleteItem(item) {
                this.$emit(`deleteitem`, item);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .item-catalog {
        width: 220px;
        height: 340px;
        background-color: #629c7e;
        padding: 10px;
        border-radius: 5px;
        transition: transform .3s, box-shadow .3s;
        color: #FFFFFF;
        margin: 20px 0;

        &:hover {
            box-shadow: 5px 5px 10px #3eaa9e;
            transform: translate(-5px, -5px);
        }
    }

    .info {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .title {
        letter-spacing: 1px;
    }

    .price {
        letter-spacing: 1px;
        font-size: 1.1em;
    }

    .btn-add {
        margin-top: 5px;
        outline: none;
        border: 2px solid #FFF;
        border-radius: 8px;
        background-color: inherit;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 5px;
        color: inherit;
        transition: box-shadow .3s, border-color .3s, color .3s;

        &:hover {
            box-shadow: 0 0 14px 0 #83f3ff;
            border-color: #83f3ff;
            color: #83f3ff;
        }
    }

    .itemPrice, .itemName {
        width: 50%;
        height: 25px;
        margin-top: 5px;
        outline: none;
        border: none;
        background-color: inherit;
        color: #FFFFFF;
        border-bottom: 1px solid #FFFFFF;
        padding: 0 5px;
        font-size: 18px;
        margin-bottom: 10px;

        &:focus {
            border-bottom-color: #83f3ff;
        }
    }

    .itemPrice {
        -moz-appearance: textfield;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    }

    .item-basket {
        text-transform: none;
        padding: 10px;

        & .info {
            flex-direction: column;
        }
    }

    .price-basket {
        margin: 8px 0;
    }

    .del {
        display: flex;
        justify-content: space-around;
        width: 100%;
    }

    .count {
        font-size: 16px;
    }

    .fa-times-circle {
        color: #64adba;
        cursor: pointer;

        &:hover {
            color: #83f3ff;
            text-shadow: 0 0 10px #83f3ff;
        }
    }
</style>