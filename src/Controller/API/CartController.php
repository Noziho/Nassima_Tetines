<?php

namespace App\Controller\API;

use App\Entity\CartItem;
use App\Repository\CartItemRepository;
use App\Repository\ProductRepository;
use App\Services\SessionCartService;
use Doctrine\ORM\EntityManagerInterface;
use http\Env\Response;
use PHPUnit\Util\Json;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use function PHPUnit\Framework\exactly;

class CartController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private CartItemRepository $cartItemRepository;

    public function __construct(EntityManagerInterface $em, CartItemRepository $cartItemRepository)
    {
        $this->entityManager = $em;
        $this->cartItemRepository = $cartItemRepository;
    }

    #[Route('/api/cart', name: 'api_cart', methods: ['GET'])]
    public function index(SessionCartService $sessionCartService): JsonResponse
    {
        return $this->json(
            $sessionCartService->getCart(),
        );
    }

    #[Route('/api/cart/add', name: 'api_cart_add', methods: ['POST'])]
    public function addToCart(Request $request, ProductRepository $productRepository, SessionCartService $sessionCartService): JsonResponse
    {
        $payload = json_decode($request->getContent(), true);

        if (!isset($payload['product_id'])
            || !isset($payload['quantity'])
            || !isset($payload['age'])
            || !isset($payload['color'])
            || !isset($payload['fontFamily'])
            || !isset($payload['mouthPiece'])
            || !isset($payload['firstname'])
        ) {
            return $this->returnError('Des champs sont manquant');
        }

        $product = $productRepository->find((int)$payload['product_id']);
        $quantity = (int)$payload['quantity'];
        $age = $payload['age'];
        $color = $payload['color'];
        $fontFamily = $payload['fontFamily'];
        $mouthPiece = $payload['mouthPiece'];
        $firstname = $payload['firstname'];

        if (null === $product) {
            return $this->returnError('Le produit n\'existe pas ou n\'est plus disponible');
        }

        $cart = $sessionCartService->getCart();

        $cartItem = (new CartItem())
            ->setProduct($product)
            ->setCart($cart)
            ->setQuantity($quantity)
            ->setAge($age)
            ->setColor($color)
            ->setFontFamily($fontFamily)
            ->setMouthPiece($mouthPiece)
            ->setFirstName($firstname);


        $this->entityManager->persist($cartItem);
        $this->entityManager->flush();

        $this->entityManager->refresh($cart);

        return $this->json($cart);
    }

    #[Route('/api/cartItem/delete/{cartItem}')]
    public function deleteCartItem (CartItem $cartItem): JsonResponse
    {
        $this->cartItemRepository->find($cartItem);
        $this->entityManager->remove($cartItem);
        $this->entityManager->flush();

        return $this->json([
            'success' => true,
            'message' => 'CartItem deleted'
        ]);
    }

    #[Route('/api/cart/delete/{cartItem}')]
    public function deleteCart (CartItem $cartItem): JsonResponse
    {

        $cartItems = $this->cartItemRepository->findBy(array('cart' => $cartItem->getCart()->getId()));
        foreach ($cartItems as $cartItem) {
            $this->entityManager->remove($cartItem);
        }
        $this->entityManager->flush();

        return $this->json([
            'success' => true,
            'message' => 'Cart deleted'
        ]);

    }

    public function returnError(string $message): JsonResponse
    {
        return $this->json([
            'error' => true,
            'message' => $message
        ]);
    }
}