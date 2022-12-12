<script>
export default {
  name: 'app-header',
  created() {
    socketService.on('order-added', (order) => {
      this.isShowNotification = true
      this.$store.commit({ type: 'addOrder', order })
    })
  },
}
</script>
