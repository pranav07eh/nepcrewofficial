from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .models import Product, CartItem, Order


# ---------------- PAGES ----------------

def clear_abandoned_cart(request):
    pass  # Disabled to persist cart items across pages


def home(request):
    clear_abandoned_cart(request)
    cart_item_count = CartItem.objects.filter(user=request.user).count() if request.user.is_authenticated else 0
    return render(request, "index.html", {"cart_item_count": cart_item_count})

def about(request):
    clear_abandoned_cart(request)
    cart_item_count = CartItem.objects.filter(user=request.user).count() if request.user.is_authenticated else 0
    return render(request, "about.html", {"cart_item_count": cart_item_count})

def contact(request):
    clear_abandoned_cart(request)
    cart_item_count = CartItem.objects.filter(user=request.user).count() if request.user.is_authenticated else 0
    return render(request, "contact.html", {"cart_item_count": cart_item_count})

def products(request):
    clear_abandoned_cart(request)
    all_products = Product.objects.all()
    cart_item_count = CartItem.objects.filter(user=request.user).count() if request.user.is_authenticated else 0
    return render(request, "products.html", {"products": all_products, "cart_item_count": cart_item_count})


# FIXED HOODIE (NO CRASH)
def hoodie_view(request):
    clear_abandoned_cart(request)
    product = Product.objects.filter(id=1).first()
    cart_item_count = CartItem.objects.filter(user=request.user).count() if request.user.is_authenticated else 0
    return render(request, "hoodie.html", {"product": product, "cart_item_count": cart_item_count})


# ---------------- AUTH ----------------

def signup_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        password1 = request.POST["password1"]
        password2 = request.POST["password2"]

        if password1 != password2:
            return render(request, "signup.html", {"error": "Passwords do not match"})

        if User.objects.filter(username=username).exists():
            return render(request, "signup.html", {"error": "User already exists"})

        if User.objects.filter(email=email).exists():
            return render(request, "signup.html", {"error": "Email already registered"})

        try:
            User.objects.create_user(username=username, email=email, password=password1)
            return redirect("login")
        except:
            return render(request, "signup.html", {"error": "Signup failed. Try different username."})

    return render(request, "signup.html")


def login_view(request):
    if request.method == "POST":
        email = request.POST["username"]
        password = request.POST["password"]
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                login(request, user)
                return redirect("home")
            else:
                return render(request, "login.html", {"error": "Invalid credentials"})
        except User.DoesNotExist:
            return render(request, "login.html", {"error": "Invalid credentials"})

    return render(request, "login.html")


def logout_view(request):
    logout(request)
    return redirect("home")


# ---------------- CART ----------------

@login_required
def add_to_cart(request):
    if request.method == "POST":
        product = Product.objects.get(id=request.POST["product_id"])
        size = request.POST.get("size", "M")
        qty = int(request.POST.get("qty", 1))

        item, created = CartItem.objects.get_or_create(
            user=request.user,
            product=product,
            size=size,
            defaults={"quantity": qty}
        )

        if not created:
            item.quantity += qty
            item.save()

        return redirect("cart")


@login_required
def my_orders(request):
    clear_abandoned_cart(request)
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    cart_item_count = 0
    return render(request, "my-orders.html", {"orders": orders, "cart_item_count": cart_item_count})

@login_required
def cart_view(request):
    if request.user.is_authenticated:
        items = CartItem.objects.filter(user=request.user)
        total = sum(i.total_price() for i in items)
        cart_item_count = items.count()
    else:
        items = []
        total = 0
        cart_item_count = 0
    return render(request, "cart.html", {
        "cart_items": items,
        "total": total,
        "cart_item_count": cart_item_count
    })


@login_required
def remove_from_cart(request, item_id):
    item = get_object_or_404(CartItem, id=item_id, user=request.user)
    item.delete()
    return redirect("cart")


# ---------------- CHECKOUT ----------------

@login_required
def checkout_view(request):
    items = CartItem.objects.filter(user=request.user)
    total = sum(i.total_price() for i in items)

    if request.method == "POST":
        order = Order.objects.create(
            user=request.user,
            total_amount=total,
            address=request.POST["address"],
            phone=request.POST["phone"],
            email=request.POST["email"]
        )
        # Pass items to payment page
        request.session['payment_items'] = [
            {
                'name': item.product.name,
                'price': float(item.product.price),
                'quantity': item.quantity,
                'size': item.size,
                'total': float(item.total_price())
            } for item in items
        ]
        return redirect("payment", order.id)
    
    if not items.exists():
        return render(request, "checkout.html", {"cart_items": [], "total": 0, "error": "Cart is empty"})
    
    return render(request, "checkout.html", {
        "cart_items": items,
        "total": total
    })


# ---------------- PAYMENT ----------------

@login_required
def payment_view(request, order_id):
    order = get_object_or_404(Order, id=order_id, user=request.user)

    context = {'order': order}
    payment_items = request.session.get('payment_items', [])
    context['items'] = payment_items

    if request.method == "POST":
        pay_option = request.POST.get('pay_option', 'now')
        request.session['pay_option'] = pay_option
        reference = request.POST.get('reference', '').strip()
        screenshot = request.FILES.get('screenshot')
        
        if pay_option == 'later':
            # Pay later - pending, no proof
            CartItem.objects.filter(user=request.user).delete()
            order.status = "Pending"
            order.save()
        elif reference and screenshot:
            # Has proof - paid
            order.reference = reference
            order.screenshot = screenshot
            CartItem.objects.filter(user=request.user).delete()
            order.status = "Paid"
            order.save()
        else:
            # No proof but not later - pending
            CartItem.objects.filter(user=request.user).delete()
            order.status = "Pending"
            order.save()
        return redirect("order_success", order.id)

    return render(request, "payment.html", context)

@login_required
def order_success(request, order_id):
    clear_abandoned_cart(request)
    order = get_object_or_404(Order, id=order_id, user=request.user)
    pay_option = request.session.pop('pay_option', 'now')
    cart_item_count = 0
    return render(request, "order-success.html", {"order": order, "pay_option": pay_option, "cart_item_count": cart_item_count})
