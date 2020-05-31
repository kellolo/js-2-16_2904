<template>
    <transition name="modal">
        <div class="modalWindow" v-show="state">
            <h3>{{messageErr}}</h3>
            <button class="btn" @click="show">ok</button>
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                messageErr: '',
                state: false
            }
        },
        methods: {
            show() {
                this.state = !this.state;
            },
            receiveMsg(text) {
                this.messageErr = text;
                this.show();
            }
        }
    }
</script>

<style scoped>
    @keyframes scale-up-center {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes scale-down-center {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
    }

    .modalWindow {
        position: fixed;
        top: 20%;
        left: calc(50% - 150px);
        width: 300px;
        height: 300px;
        border: 2px solid #2f4a88;
        border-radius: 15px;
        padding: 20px;
        background-color: rgba(250, 250, 250, .7);
        color: #c20606;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
    }

    h3 {
        padding-top: 50px;
        font-size: 24px;
        text-align: center;
    }

    .btn {
        outline: none;
        border: none;
        text-transform: uppercase;
        font-size: 22px;
        letter-spacing: 2px;
        font-weight: bold;
        padding: 20px;
    }

    .btn:hover {
        color: #c20606;
    }

    .modal-enter-active {
        animation: scale-up-center 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    }

    .modal-leave-active {
        animation: scale-down-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
</style>