<template>
    <div>
        <base-dialog :show="!!error" title="An error ocurred" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <base-card>
                <header>
                    <h2>Requests received </h2>
                </header>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasRequests">
                    <request-item v-for="req in receivedRequests" :key="req.id" :email="req.userEmail"
                        :message="req.message"></request-item>
                </ul>
                <h3 v-else>You haven't received any requests yet!</h3>
            </base-card>
        </section>
    </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
    components: {
        RequestItem,
    },
    data() {
        return {
            isLoading: false,
            error: null,
        }
    },
    computed: {
        receivedRequests() {
            return !this.isLoading && this.$store.getters['requests/requests'];
        },
        hasRequests() {
            return this.$store.getters['requests/hasRequests'];
        }
    },
    created() {
        this.loadRequests();
    },
    methods: {
        async loadRequests() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('requests/fetchRequests');
            } catch (error) {
                this.error = error.message || 'Something failed!'
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
        }
    }
}
</script>
<style scoped>
header {
    text-align: center;
}

ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
}

h3 {
    text-align: center;
}
</style>