$(document).ready(function () {
    loadDataTable();
});

$('#Addbtn').click(function () {
    $('#StudentModal').modal('show');
    $('#ModalTitle').text('Add Student');
    $('#Save').show();
    $('#Update').hide();
});

function loadDataTable() {
    var datatable = $('#studentTable').DataTable({
        "ajax": {
            "url": "/Home/GetAll",
            "type": "GET",
            "dataType": "json",
            "dataSrc": "" // Ensure dataSrc is set to an empty string
        },
        "columns": [
            { "data": "id", "className": "text-center" },
            { "data": "rollNo", "className": "text-center" },
            { "data": "name", "className": "text-center" },
            { "data": "percentage", "className": "text-center" },
            {
                "data": null,
                "className": "text-center",
                "render": function (data, type, row) {
                    return `<div class="btn btn-group w-75">
                                <button class="btn btn-primary me-1" onclick="Edit(${data.id})">Edit</button>
                                <button onclick="ConfirmDelete(${data.id})" class="btn btn-danger ms-1">Delete</button>
                            </div>`;
                }
            }
        ]
    });
}

function Add() {
    var formData = {
        rollNo: $('#RollNo').val(),
        name: $('#Name').val(),
        percentage: $('#Percentage').val()
    };

    $.ajax({
        type: "POST",
        url: "/Home/Add",
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.success) {
                toastr.success(response.message);
                $('#studentTable').DataTable().ajax.reload();
                $('#StudentModal').modal('hide');
                // Clear input values after successful addition
                $('#RollNo').val('');
                $('#Name').val('');
                $('#Percentage').val('');
            } else {
                toastr.error(response.message);
            }
        },
        error: function (error) {
            console.log(error);
            toastr.error('An error occurred while adding the student.');
        }
    });
}


function Edit(id) {
    $.ajax({
        type: "GET",
        url: `/Home/Edit?id=${id}`,
        success: function (response) {
            if (response.success) {
                var student = response.data;
                $('#Id').val(student.id);
                $('#RollNo').val(student.rollNo);
                $('#Name').val(student.name);
                $('#Percentage').val(student.percentage);
                $('#ModalTitle').text('Edit Student');
                $('#Save').hide();
                $('#Update').show();
                $('#StudentModal').modal('show');
            } else {
                toastr.error(response.message);
            }
        },
        error: function (error) {
            console.log(error);
            toastr.error('An error occurred while fetching the student data.');
        }
    });
}

function Update() {
    var formData = {
        id: $('#Id').val(),
        rollNo: $('#RollNo').val(),
        name: $('#Name').val(),
        percentage: $('#Percentage').val()
    };

    $.ajax({
        type: "POST",
        url: "/Home/Update",
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.success) {
                toastr.success(response.message);
                $('#studentTable').DataTable().ajax.reload();
                $('#StudentModal').modal('hide');
                // Clear input values after successful update
                $('#Id').val('');
                $('#RollNo').val('');
                $('#Name').val('');
                $('#Percentage').val('');
            } else {
                toastr.error(response.message);
            }
        },
        error: function (error) {
            console.log(error);
            toastr.error('An error occurred while updating the student.');
        }
    });
}


function ConfirmDelete(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url: `/Home/Delete?id=${id}`,
                success: function (response) {
                    if (response.success) {
                        toastr.success(response.message);
                        $('#studentTable').DataTable().ajax.reload();
                    } else {
                        toastr.error(response.message);
                    }
                },
                error: function (error) {
                    console.log(error);
                    toastr.error('An error occurred while deleting the student.');
                }
            });
        }
    });
}
