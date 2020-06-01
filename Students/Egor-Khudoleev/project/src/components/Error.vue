<template>
    <div class="popup-container" @click.stop="closePopup($event)">
        <div class="popup-content">
            <div class="popup-text">На странице произошла ошибка: {{ errorText }}</div>
            <button type="button" class="popup-close" @click.stop="closePopup($event)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            errorText: {
                type: String
            }
        },
        methods: {
            closePopup(e) {
                if (e.target.className !== 'popup-content' && e.target.className !== 'popup-text') {
                    this.$emit('close-popup');
                }
            }
        }
    }
</script>

<style>
    .popup-container {
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        justify-content: center;
        align-items: center;
        position: fixed;
        z-index: 9999;
        display: flex;
    }

    .popup-content {
        width: 300px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ccc;
        border-radius: 25px;
        position: relative;
    }

    .popup-text {
        padding: 20px;
    }

    .popup-close {
        background-color: transparent;
        position: absolute;
        top: 5%;
        right: 5%;
        cursor: pointer;
        border: 0;
    }
</style>