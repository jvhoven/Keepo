export default {
  selector: 'rooms',
  templateUrl: '/client/pages/_partials/rooms.html',
  bindings: {
    rooms: '='
  },
  controller: function ($scope, RoomsService, socket) {
    $scope.makingRoom = false
    $scope.roomName = ''

    /**
     * Assigns user to a room namespace.
     */
    $scope.joinRoom = (roomName) => {
      RoomsService.join(roomName)
        .then(rooms => $scope.$apply(() => {
          this.rooms = rooms
        }))
    }

    /**
     * Toggles the creation field for making a new room.
     */
    $scope.toggleCreate = () => {
      $scope.makingRoom = !this.makingRoom
    }

    /**
     * Registers a new room at the server.
     */
    $scope.createRoom = () => {
      RoomsService.create($scope.roomName)
        .then(rooms => $scope.$apply(() => {
          this.rooms = rooms
        }))

      // Reset scope values
      $scope.makingRoom = false
      $scope.roomName = ''
    }

    /**
     * Update rooms when an event modifies the room structure.
     */
    socket.on('update:rooms', (data) => {
      this.rooms = data
    })
  }
}