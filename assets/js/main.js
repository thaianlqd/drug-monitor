let url = location.host;

$(document).ready(function() {
    $("table").rtResponsiveTables();

    // $("#add_drug").submit(function(event) {
    //     event.preventDefault();
    //     alert($("#name").val() + " sent successfully!");
    // });

    //thử add khác:
    $("#add_drug").submit(function(event) {
        event.preventDefault();

        var unindexed_array = $(this).serializeArray();
        var data = {};
        $.map(unindexed_array, function(n, i) {
            data[n['name']] = n['value'];
        });

        $.ajax({
            url: `http://${url}/api/drugs`,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(data)
        })
        .done(function(response) {
            alert(data.name + " added successfully!");
            window.location.href = "/manage"; // chuyển sang trang manage
        })
        .fail(function(xhr, status, error) {
            const errorMsg = xhr.responseJSON?.message || `Lỗi thêm thuốc: ${xhr.status} - ${xhr.statusText}`;
            alert(errorMsg);
        });
    });


    $("#update_drug").submit(function(event) {
        event.preventDefault();
        var unindexed_array = $(this).serializeArray();
        var data = {};
        $.map(unindexed_array, function(n, i) {
            data[n['name']] = n['value'];
        });
        var request = {
            "url": `http://${url}/api/drugs/${data.id}`,
            "method": "PUT",
            "data": data
        };
        $.ajax(request)
            .done(function(response) {
                alert(data.name + " Updated Successfully!");
                window.location.href = "/manage";
            })
            .fail(function(xhr, status, error) {
                const errorMsg = xhr.responseJSON?.message || `Lỗi cập nhật: ${xhr.status} - ${xhr.statusText}`;
                alert(errorMsg);
            });
    });

    if (window.location.pathname === "/manage") {
        const $ondelete = $("table tbody td a.delete");
        $ondelete.click(function() {
            const id = $(this).attr("data-id");
            if (!id) {
                alert("ID thuốc không hợp lệ.");
                return;
            }
            const request = {
                "url": `http://${url}/api/drugs/${id}`,
                "method": "DELETE"
            };
            if (confirm("Do you really want to delete this drug?")) {
                $.ajax(request)
                    .done(function(response) {
                        alert("Drug deleted Successfully!");
                        location.reload();
                    })
                    .fail(function(xhr, status, error) {
                        alert(`Lỗi xóa: ${xhr.responseJSON?.message || "Không thể xóa thuốc"}`);
                    });
            }
        });
    }

    if (window.location.pathname === "/purchase") {
        $("#drug_days").submit(function(event) {
            event.preventDefault();
            const days = +$("#days").val();
            if (!days || isNaN(days) || days <= 0) {
                alert("Please enter a valid number of days");
                return;
            }
            const request = {
                "url": `http://${url}/api/purchase`,
                "method": "POST",
                "data": JSON.stringify({ days }), // Gửi đúng JSON
                "contentType": "application/json; charset=utf-8",
                "dataType": "json"
            };
            $.ajax(request)
                .done(function(response) {
                    alert("Purchase calculated successfully!");
                    const purchaseData = response.data;
                    let message = "Drugs to buy:\n";
                    purchaseData.forEach(item => {
                        message += `${item.name}: ${item.cardsToBuy} cards, ${item.packsToBuy} packs\n`;
                    });
                    alert(message);
                    const tbody = $("#purchase_table tbody");
                    tbody.empty();
                    purchaseData.forEach((item, index) => {
                        tbody.append(`
                            <tr>
                                <td>${index + 1}</td>
                                <td>${item.name}</td>
                                <td>${item.cardsToBuy}</td>
                                <td>${item.packsToBuy}</td>
                            </tr>
                        `);
                    });
                    $("#purchase_table").show();
                })
                .fail(function(xhr, status, error) {
                    alert(`Lỗi: ${xhr.responseJSON?.message || "Không thể tính toán mua thuốc"}`);
                    console.log("Error details:", xhr.responseText); // Log chi tiết lỗi
                });
        });
    }
});