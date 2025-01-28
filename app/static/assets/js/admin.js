$(document).ready(function() {
    // Add Food Item
    $('#addFoodForm').on('submit', function(event) {
        event.preventDefault();

        let foodName = $('#foodName').val();
        let foodImage = $('#foodImage').val();
        let foodPrice = $('#foodPrice').val();

        let foodItem = `
            <tr>
                <td><img src="${foodImage}" alt="${foodName}"></td>
                <td>${foodName}</td>
                <td>₹<span class="food-price">${foodPrice}</span></td>
                <td>
                    <button class="btn btn-warning btn-edit">Edit</button>
                    <button class="btn btn-danger btn-delete">Delete</button>
                </td>
            </tr>
        `;

        $('#foodMenu').append(foodItem);

        // Clear form fields
        $('#foodName').val('');
        $('#foodImage').val('');
        $('#foodPrice').val('');
    });

    // Edit and Delete Food Item
    $(document).on('click', '.btn-edit', function() {
        let row = $(this).closest('tr');
        let foodName = row.find('td:nth-child(2)').text();
        let foodPrice = row.find('.food-price').text();

        $('#foodName').val(foodName);
        $('#foodPrice').val(foodPrice);
        $('#foodImage').val(row.find('img').attr('src'));

        row.remove();
    });

    $(document).on('click', '.btn-delete', function() {
        $(this).closest('tr').remove();
    });
});
