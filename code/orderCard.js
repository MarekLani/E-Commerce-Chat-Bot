createOrderCard: function (session, order) {
	var locale = getLocale(session);

	var products = [];
	var qties = [];
	var prices = [];

	//Create lines for adaptive card
	order.basket_lines.forEach(function (item) {
		var productLine = {
			"type": "TextBlock",
			"text": item.variant_name,
			"wrap": false,
			"isSubtle": true
		}
		products.push(productLine);

		var priceLine = {
			"type": "TextBlock",
			"text": item.total_price_incl_tax + ' Eur',
			"wrap": false,
			"isSubtle": true
		}
		prices.push(priceLine);

		var qtyLine = {
			"type": "TextBlock",
			"text": item.quantity,
			"wrap": false,
			"isSubtle": true
		}
		qties.push(qtyLine);
	})


	var card = {
		contentType: "application/vnd.microsoft.card.adaptive",
		content: {
			type: "AdaptiveCard",
			body: [
				{
					"type": "TextBlock",
					"text": String.format(session.localizer.gettext(locale, "orderCardTitle"), order.purchase_number),
					"size": "large",
					"weight": "bolder"
				},
				{
					"type": "ColumnSet",
					"separation": "strong",
					"columns": [
						{
							"type": "Column",
							"size": "0.4",
							"items": [
								{
									"type": "TextBlock",
									"text": session.localizer.gettext(locale, "orderDate"),
									"wrap": true
								},
								{
									"type": "TextBlock",
									"text": session.localizer.gettext(locale, "status"),
									"wrap": true
								}
							]
						},
						{
							"type": "Column",
							"size": "stretch",
							"items": [
								{
									"type": "TextBlock",
									"text": getDateString(order.date_start),
									"isSubtle": true,
									"wrap": true
								},
								{
									"type": "TextBlock",
									"text": order.delivery_status,
									"isSubtle": true,
									"wrap": true
								}
							]
						}
					]
				},
				{
					"type": "ColumnSet",
					"separation": "strong",
					"columns": [
						{
							"type": "Column",
							"size": "0.6",
							"items": [
								{
									"type": "TextBlock",
									"text": session.localizer.gettext(locale, "product"),
									"wrap": true
								}
							]
						},
						{
							"type": "Column",
							"size": "0.15",
							"items": [
								{
									"type": "TextBlock",
									"text": session.localizer.gettext(locale, "qty"),
									"wrap": true
								}
							]
						},
						{
							"type": "Column",
							"size": "0.25",
							"items": [
								{
									"type": "TextBlock",
									"text": session.localizer.gettext(locale, "totalPriceNoSemi"),
									"wrap": true
								}
							]
						}
					]
				},
				{
					"type": "ColumnSet",
					"separation": "none",
					"columns": [
						{
							"type": "Column",
							"size": "0.6",
							"items": products
						},
						{
							"type": "Column",
							"size": "0.15",
							"items": qties
						},
						{
							"type": "Column",
							"size": "0.25",
							"items": prices
						}
					]
				},
				{
					"type": "ColumnSet",
					"separation": "strong",
					"columns": [
						{
							"type": "Column",
							"size": "0.4",
							"items": [
								{
									"type": "TextBlock",
									"text": session.localizer.gettext(locale, "address"),
									"wrap": true
								}
							]
						},
						{
							"type": "Column",
							"size": "stretch",
							"items": [
								{
									"type": "TextBlock",
									"text": order.address.street + ' ' + order.address.number,
									"isSubtle": true,
									"wrap": true
								},
								{
									"type": "TextBlock",
									"text": order.address.postal_code,
									"isSubtle": true,
									"wrap": true
								},
								{
									"type": "TextBlock",
									"text": order.address.town,
									"isSubtle": true,
									"wrap": true
								},
								{
									"type": "TextBlock",
									"text": order.address.country,
									"isSubtle": true,
									"wrap": true
								}
							]
						}
					]
				},
				{
					"type": "ColumnSet",
					"separation": "strong",
					"columns": [
						{
							"type": "Column",
							"size": "0.4",
							"items": [
								{
									"type": "TextBlock",
									"text": session.localizer.gettext(locale, "totalPrice"),
									"wrap": true
								},
								{
									"type": "TextBlock",
									"text": session.localizer.gettext(locale, "tax"),
									"wrap": true
								},
								{
									"type": "TextBlock",
									"text": session.localizer.gettext(locale, "shipping"),
									"wrap": true
								}
							]
						},
						{
							"type": "Column",
							"size": "stretch",
							"items": [
								{
									"type": "TextBlock",
									"text": order.price_incl_tax + ' Eur',
									"isSubtle": true,
									"wrap": true
								},
								{
									"type": "TextBlock",
									"text": order.tax + ' Eur',
									"isSubtle": true,
									"wrap": true
								},
								{
									"type": "TextBlock",
									"text": order.shipping_payment_price + ' Eur',
									"isSubtle": true,
									"wrap": true
								}
							]
						}
					]
				}
			]
		}
	}
	return card;
}